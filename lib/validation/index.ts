import { z } from 'zod';

export const CreatorProfileSchema = z.object({
  display_name: z.string().min(2, 'Name must be at least 2 characters'),
  timezone: z.string().default('UTC'),
  working_hours_per_day: z.number().min(1).max(24).default(8),
  working_days: z.array(z.number().min(1).max(7)).default([1, 2, 3, 4, 5]),
  weekly_capacity_hours: z.number().min(1).max(100).default(40),
});

export const BrandSchema = z.object({
  name: z.string().min(1, 'Brand name is required'),
  contact_name: z.string().nullable().optional(),
  contact_email: z.string().email('Invalid email address').nullable().optional(),
  notes: z.string().nullable().optional(),
});

export const CampaignSchema = z.object({
  brand_id: z.string().uuid('Invalid brand ID'),
  name: z.string().min(1, 'Campaign name is required'),
  status: z.enum(['draft', 'active', 'completed', 'cancelled']).default('active'),
  platform: z.enum(['youtube', 'instagram', 'tiktok', 'podcast', 'multi']).default('youtube'),
  submission_deadline: z.string().datetime().nullable().optional(),
  publish_date: z.string().datetime().nullable().optional(),
  payment_amount: z.number().min(0, 'Payment amount must be non-negative'),
  currency: z.string().length(3).default('USD'),
  payment_terms_days: z.number().int().min(0).default(30),
  revision_limit: z.number().int().min(0).default(2),
  source: z.enum(['manual', 'brief']).default('manual'),
});

export const DeliverableSchema = z.object({
  campaign_id: z.string().uuid('Invalid campaign ID'),
  type: z.enum(['long_video', 'short_video', 'reel', 'post', 'other']).default('long_video'),
  title: z.string().min(1, 'Title is required'),
  due_date: z.string().datetime().nullable().optional(),
  specs: z.record(z.unknown()).default({}),
});

export const TaskSchema = z.object({
  campaign_id: z.string().uuid('Invalid campaign ID'),
  deliverable_id: z.string().uuid().nullable().optional(),
  title: z.string().min(1, 'Task title is required'),
  status: z.enum(['not_started', 'in_progress', 'blocked', 'done']).default('not_started'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  estimated_hours: z.number().min(0).default(2),
  duration_days: z.number().int().min(1).default(1),
  start_date: z.string().datetime().nullable().optional(),
  due_date: z.string().datetime().nullable().optional(),
  deadline_type: z.enum(['fixed', 'flexible']).default('flexible'),
  assignee_resource_id: z.string().uuid().nullable().optional(),
});

export const TaskDependencySchema = z.object({
  task_id: z.string().uuid(),
  depends_on_task_id: z.string().uuid(),
}).refine(data => data.task_id !== data.depends_on_task_id, {
  message: 'A task cannot depend on itself',
  path: ['depends_on_task_id'],
});

export const ApprovalSchema = z.object({
  campaign_id: z.string().uuid(),
  task_id: z.string().uuid().nullable().optional(),
  type: z.enum(['script', 'rough_cut', 'final']),
  status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
  expected_turnaround_days: z.number().int().min(1).default(2),
  feedback: z.string().nullable().optional(),
});

export const InvoiceSchema = z.object({
  campaign_id: z.string().uuid(),
  invoice_number: z.string().min(1),
  amount: z.number().min(0),
  status: z.enum(['draft', 'sent', 'paid', 'overdue']).default('draft'),
  due_date: z.string().datetime(),
  notes: z.string().nullable().optional(),
});

export const ChangeEventSchema = z.object({
  type: z.enum(['deadline_moved', 'approval_delayed', 'resource_unavailable', 'duration_changed', 'task_reordered', 'deal_added']),
  description: z.string().min(1),
  before_state: z.record(z.unknown()).default({}),
  after_state: z.record(z.unknown()).default({}),
  affected_task_ids: z.array(z.string().uuid()).default([]),
  constraints: z.record(z.unknown()).default({}),
  assumptions: z.record(z.unknown()).default({}),
  status: z.enum(['proposed', 'approved', 'rejected', 'undone']).default('proposed'),
});

export const RiskAlertSchema = z.object({
  campaign_id: z.string().uuid().nullable().optional(),
  task_id: z.string().uuid().nullable().optional(),
  title: z.string().min(1),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  kind: z.enum(['potential', 'confirmed']).default('potential'),
  evidence: z.record(z.unknown()).default({}),
  reason: z.string(),
  recommended_action: z.string(),
  relevant_date: z.string().datetime().nullable().optional(),
});

export const MessageDraftSchema = z.object({
  campaign_id: z.string().uuid(),
  type: z.enum(['approval_request', 'deadline_negotiation', 'invoice_followup', 'editor_brief', 'status_update']),
  recipient: z.string().min(1),
  subject: z.string().min(1),
  body: z.string().min(1),
  status: z.enum(['draft', 'copied']).default('draft'),
});
