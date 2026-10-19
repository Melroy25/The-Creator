-- CREATOR FLOW: Initial Database Schema (Phase 1)
-- CODE MEET 2026 Hackathon: Problem Statement 4 (Creator Economy Tech)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Automated updated_at trigger function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. CREATOR PROFILES
CREATE TABLE IF NOT EXISTS creator_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  display_name TEXT NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'UTC',
  working_hours_per_day NUMERIC NOT NULL DEFAULT 8.0 CHECK (working_hours_per_day > 0 AND working_hours_per_day <= 24),
  working_days INT[] NOT NULL DEFAULT '{1,2,3,4,5}', -- 1=Mon, 7=Sun
  weekly_capacity_hours NUMERIC NOT NULL DEFAULT 40.0 CHECK (weekly_capacity_hours > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_creator_profiles_owner UNIQUE (owner_id)
);
CREATE TRIGGER trg_creator_profiles_updated BEFORE UPDATE ON creator_profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 2. BRANDS
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_brands_owner ON brands(owner_id);
CREATE TRIGGER trg_brands_updated BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 3. CAMPAIGNS
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed', 'cancelled')),
  platform TEXT NOT NULL DEFAULT 'youtube' CHECK (platform IN ('youtube', 'instagram', 'tiktok', 'podcast', 'multi')),
  submission_deadline TIMESTAMPTZ,
  publish_date TIMESTAMPTZ,
  payment_amount NUMERIC NOT NULL DEFAULT 0.0 CHECK (payment_amount >= 0),
  currency TEXT NOT NULL DEFAULT 'USD',
  payment_terms_days INT NOT NULL DEFAULT 30,
  revision_limit INT NOT NULL DEFAULT 2,
  source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('manual', 'brief')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_campaigns_owner ON campaigns(owner_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_brand ON campaigns(brand_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_deadlines ON campaigns(submission_deadline, publish_date);
CREATE TRIGGER trg_campaigns_updated BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 4. DELIVERABLES
CREATE TABLE IF NOT EXISTS deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'long_video' CHECK (type IN ('long_video', 'short_video', 'reel', 'post', 'other')),
  title TEXT NOT NULL,
  due_date TIMESTAMPTZ,
  specs JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_deliverables_owner ON deliverables(owner_id);
CREATE INDEX IF NOT EXISTS idx_deliverables_campaign ON deliverables(campaign_id);
CREATE TRIGGER trg_deliverables_updated BEFORE UPDATE ON deliverables FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 5. RESOURCES (Team & Roles)
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('creator', 'editor', 'thumbnail_artist', 'manager', 'other')),
  hours_per_day NUMERIC NOT NULL DEFAULT 8.0 CHECK (hours_per_day > 0 AND hours_per_day <= 24),
  working_days INT[] NOT NULL DEFAULT '{1,2,3,4,5}',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_resources_owner ON resources(owner_id);
CREATE TRIGGER trg_resources_updated BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 6. RESOURCE AVAILABILITY (Overrides & Outages)
CREATE TABLE IF NOT EXISTS resource_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  date_from DATE NOT NULL,
  date_to DATE NOT NULL,
  available_hours_per_day NUMERIC NOT NULL DEFAULT 0.0 CHECK (available_hours_per_day >= 0 AND available_hours_per_day <= 24),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT chk_dates_order CHECK (date_from <= date_to)
);
CREATE INDEX IF NOT EXISTS idx_res_avail_owner ON resource_availability(owner_id);
CREATE INDEX IF NOT EXISTS idx_res_avail_resource ON resource_availability(resource_id);
CREATE INDEX IF NOT EXISTS idx_res_avail_dates ON resource_availability(date_from, date_to);
CREATE TRIGGER trg_resource_availability_updated BEFORE UPDATE ON resource_availability FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 7. TASKS
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  deliverable_id UUID REFERENCES deliverables(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'blocked', 'done')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  estimated_hours NUMERIC NOT NULL DEFAULT 2.0 CHECK (estimated_hours >= 0),
  duration_days INT NOT NULL DEFAULT 1 CHECK (duration_days >= 1),
  start_date TIMESTAMPTZ,
  due_date TIMESTAMPTZ,
  deadline_type TEXT NOT NULL DEFAULT 'flexible' CHECK (deadline_type IN ('fixed', 'flexible')),
  assignee_resource_id UUID REFERENCES resources(id) ON DELETE SET NULL,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_tasks_owner ON tasks(owner_id);
CREATE INDEX IF NOT EXISTS idx_tasks_campaign ON tasks(campaign_id);
CREATE INDEX IF NOT EXISTS idx_tasks_dates ON tasks(start_date, due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE TRIGGER trg_tasks_updated BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 8. TASK DEPENDENCIES (Edges)
CREATE TABLE IF NOT EXISTS task_dependencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  depends_on_task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT chk_no_self_dependency CHECK (task_id <> depends_on_task_id),
  CONSTRAINT uq_task_dependency UNIQUE (task_id, depends_on_task_id)
);
CREATE INDEX IF NOT EXISTS idx_deps_owner ON task_dependencies(owner_id);
CREATE INDEX IF NOT EXISTS idx_deps_task ON task_dependencies(task_id);
CREATE INDEX IF NOT EXISTS idx_deps_depends_on ON task_dependencies(depends_on_task_id);

-- 9. APPROVALS
CREATE TABLE IF NOT EXISTS approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  type TEXT NOT NULL DEFAULT 'script' CHECK (type IN ('script', 'rough_cut', 'final')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  responded_at TIMESTAMPTZ,
  expected_turnaround_days INT NOT NULL DEFAULT 2,
  feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_approvals_owner ON approvals(owner_id);
CREATE INDEX IF NOT EXISTS idx_approvals_campaign ON approvals(campaign_id);
CREATE INDEX IF NOT EXISTS idx_approvals_status ON approvals(status);
CREATE TRIGGER trg_approvals_updated BEFORE UPDATE ON approvals FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 10. INVOICES
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL,
  amount NUMERIC NOT NULL CHECK (amount >= 0),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue')),
  issued_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  due_date TIMESTAMPTZ NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_invoices_owner ON invoices(owner_id);
CREATE INDEX IF NOT EXISTS idx_invoices_campaign ON invoices(campaign_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status_due ON invoices(status, due_date);
CREATE TRIGGER trg_invoices_updated BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 11. PAYMENTS
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  received_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  method TEXT DEFAULT 'bank_transfer',
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_payments_owner ON payments(owner_id);
CREATE INDEX IF NOT EXISTS idx_payments_invoice ON payments(invoice_id);
CREATE TRIGGER trg_payments_updated BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 12. EXPENSES
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  category TEXT NOT NULL CHECK (category IN ('software', 'contractor', 'equipment', 'studio', 'travel', 'other')),
  amount NUMERIC NOT NULL CHECK (amount > 0),
  incurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_expenses_owner ON expenses(owner_id);
CREATE INDEX IF NOT EXISTS idx_expenses_campaign ON expenses(campaign_id);
CREATE TRIGGER trg_expenses_updated BEFORE UPDATE ON expenses FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 13. CHANGE EVENTS (Audit Log & Undo)
CREATE TABLE IF NOT EXISTS change_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('deadline_moved', 'approval_delayed', 'resource_unavailable', 'duration_changed', 'task_reordered', 'deal_added')),
  description TEXT NOT NULL,
  before_state JSONB DEFAULT '{}'::jsonb,
  after_state JSONB DEFAULT '{}'::jsonb,
  affected_task_ids UUID[] DEFAULT '{}',
  constraints JSONB DEFAULT '{}'::jsonb,
  assumptions JSONB DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'proposed' CHECK (status IN ('proposed', 'approved', 'rejected', 'undone')),
  approved_at TIMESTAMPTZ,
  undone_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_change_events_owner ON change_events(owner_id);
CREATE INDEX IF NOT EXISTS idx_change_events_status ON change_events(status);
CREATE TRIGGER trg_change_events_updated BEFORE UPDATE ON change_events FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 14. RISK ALERTS
CREATE TABLE IF NOT EXISTS risk_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  kind TEXT NOT NULL DEFAULT 'potential' CHECK (kind IN ('potential', 'confirmed')),
  evidence JSONB DEFAULT '{}'::jsonb,
  reason TEXT NOT NULL,
  recommended_action TEXT NOT NULL,
  relevant_date TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_risk_alerts_owner ON risk_alerts(owner_id);
CREATE INDEX IF NOT EXISTS idx_risk_alerts_severity ON risk_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_risk_alerts_campaign ON risk_alerts(campaign_id);
CREATE TRIGGER trg_risk_alerts_updated BEFORE UPDATE ON risk_alerts FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 15. MESSAGE DRAFTS
CREATE TABLE IF NOT EXISTS message_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('approval_request', 'deadline_negotiation', 'invoice_followup', 'editor_brief', 'status_update')),
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'copied')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_message_drafts_owner ON message_drafts(owner_id);
CREATE INDEX IF NOT EXISTS idx_message_drafts_campaign ON message_drafts(campaign_id);
CREATE TRIGGER trg_message_drafts_updated BEFORE UPDATE ON message_drafts FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES ON ALL 15 TABLES
-- User can ONLY select, insert, update, and delete rows where owner_id = auth.uid()
-- ====================================================================

ALTER TABLE creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE change_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "creator_profiles_owner_all" ON creator_profiles FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "brands_owner_all" ON brands FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "campaigns_owner_all" ON campaigns FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "deliverables_owner_all" ON deliverables FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "resources_owner_all" ON resources FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "resource_availability_owner_all" ON resource_availability FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "tasks_owner_all" ON tasks FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "task_dependencies_owner_all" ON task_dependencies FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "approvals_owner_all" ON approvals FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "invoices_owner_all" ON invoices FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "payments_owner_all" ON payments FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "expenses_owner_all" ON expenses FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "change_events_owner_all" ON change_events FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "risk_alerts_owner_all" ON risk_alerts FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "message_drafts_owner_all" ON message_drafts FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
