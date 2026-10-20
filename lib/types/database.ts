export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type CampaignStatus = 'draft' | 'active' | 'completed' | 'cancelled';
export type PlatformType = 'youtube' | 'instagram' | 'tiktok' | 'podcast' | 'multi';
export type DeliverableType = 'long_video' | 'short_video' | 'reel' | 'post' | 'other';
export type TaskStatus = 'not_started' | 'in_progress' | 'blocked' | 'done';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';
export type DeadlineType = 'fixed' | 'flexible';
export type ResourceRole = 'creator' | 'editor' | 'thumbnail_artist' | 'manager' | 'other';
export type ApprovalType = 'script' | 'rough_cut' | 'final';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';
export type ExpenseCategory = 'software' | 'contractor' | 'equipment' | 'studio' | 'travel' | 'other';
export type ChangeEventType = 'deadline_moved' | 'approval_delayed' | 'resource_unavailable' | 'duration_changed' | 'task_reordered' | 'deal_added';
export type ChangeEventStatus = 'proposed' | 'approved' | 'rejected' | 'undone';
export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical';
export type RiskKind = 'potential' | 'confirmed';
export type MessageDraftType = 'approval_request' | 'deadline_negotiation' | 'invoice_followup' | 'editor_brief' | 'status_update';
export type MessageDraftStatus = 'draft' | 'copied';
export type ProvenanceType = 'Confirmed' | 'Assumption' | 'Calculated' | 'AI suggestion';

export type ThemePreference = 'light' | 'system' | 'dark';
export type AccentPreference = 'amber' | 'mint' | 'pink' | 'blue';

export interface CreatorProfile {
  id: string;
  owner_id: string;
  display_name: string;
  timezone: string;
  working_hours_per_day: number;
  working_days: number[];
  weekly_capacity_hours: number;
  theme_preference?: ThemePreference;
  accent_preference?: AccentPreference;
  settings?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  owner_id: string;
  name: string;
  contact_name: string | null;
  contact_email: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  owner_id: string;
  brand_id: string;
  name: string;
  status: CampaignStatus;
  platform: PlatformType;
  submission_deadline: string | null;
  publish_date: string | null;
  payment_amount: number;
  currency: string;
  payment_terms_days: number;
  revision_limit: number;
  source: 'manual' | 'brief';
  created_at: string;
  updated_at: string;
  // Joins
  brand?: Brand;
  deliverables?: Deliverable[];
  tasks?: Task[];
}

export interface Deliverable {
  id: string;
  owner_id: string;
  campaign_id: string;
  type: DeliverableType;
  title: string;
  due_date: string | null;
  specs: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  owner_id: string;
  name: string;
  role: ResourceRole;
  hours_per_day: number;
  working_days: number[];
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ResourceAvailability {
  id: string;
  owner_id: string;
  resource_id: string;
  date_from: string;
  date_to: string;
  available_hours_per_day: number;
  note: string | null;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  owner_id: string;
  campaign_id: string;
  deliverable_id: string | null;
  title: string;
  status: TaskStatus;
  priority: PriorityLevel;
  estimated_hours: number;
  duration_days: number;
  start_date: string | null;
  due_date: string | null;
  deadline_type: DeadlineType;
  assignee_resource_id: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  // Computed / Joined
  assignee?: Resource;
  dependencies?: string[];
  campaign?: Campaign;
}

export interface TaskDependency {
  id: string;
  owner_id: string;
  task_id: string;
  depends_on_task_id: string;
  created_at: string;
}

export interface Approval {
  id: string;
  owner_id: string;
  campaign_id: string;
  task_id: string | null;
  type: ApprovalType;
  status: ApprovalStatus;
  requested_at: string;
  responded_at: string | null;
  expected_turnaround_days: number;
  feedback: string | null;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  owner_id: string;
  campaign_id: string;
  invoice_number: string;
  amount: number;
  status: InvoiceStatus;
  issued_at: string;
  due_date: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  campaign?: Campaign;
}

export interface Payment {
  id: string;
  owner_id: string;
  invoice_id: string;
  amount: number;
  received_at: string;
  method: string | null;
  note: string | null;
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: string;
  owner_id: string;
  campaign_id: string | null;
  category: ExpenseCategory;
  amount: number;
  incurred_at: string;
  note: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChangeEvent {
  id: string;
  owner_id: string;
  type: ChangeEventType;
  description: string;
  before_state: Record<string, unknown>;
  after_state: Record<string, unknown>;
  affected_task_ids: string[];
  constraints: Record<string, unknown>;
  assumptions: Record<string, unknown>;
  status: ChangeEventStatus;
  approved_at: string | null;
  undone_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface RiskAlert {
  id: string;
  owner_id: string;
  campaign_id: string | null;
  task_id: string | null;
  title: string;
  severity: RiskSeverity;
  kind: RiskKind;
  evidence: Record<string, unknown>;
  reason: string;
  recommended_action: string;
  relevant_date: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface MessageDraft {
  id: string;
  owner_id: string;
  campaign_id: string;
  type: MessageDraftType;
  recipient: string;
  subject: string;
  body: string;
  status: MessageDraftStatus;
  created_at: string;
  updated_at: string;
}
