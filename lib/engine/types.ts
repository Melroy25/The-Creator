/**
 * CREATOR FLOW: Deterministic Engine Domain Types
 * Strict, standalone domain types with zero external dependencies.
 */

export type DateString = string; // ISO Date String: YYYY-MM-DD

export type TaskStatus = 'not_started' | 'in_progress' | 'blocked' | 'done';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type DeadlineType = 'fixed' | 'flexible';
export type Provenance = 'confirmed' | 'assumption' | 'calculated' | 'ai_suggestion';

export interface EngineTask {
  id: string;
  campaignId: string;
  title: string;
  status: TaskStatus;
  priority: Priority;
  estimatedHours?: number; // Defaults to 4 hours if missing (recorded as assumption)
  durationDays?: number;
  startDate?: DateString;
  dueDate?: DateString;
  deadlineType: DeadlineType;
  assigneeId?: string;
  completedAt?: DateString;
}

export interface Dependency {
  taskId: string;
  dependsOnTaskId: string;
}

export interface EngineResource {
  id: string;
  name: string;
  role: 'creator' | 'editor' | 'other';
  hoursPerDay: number;
  workingDays: number[]; // 1 = Monday ... 7 = Sunday
}

export interface ResourceAvailability {
  resourceId: string;
  dateFrom: DateString;
  dateTo: DateString;
  hoursPerDay: number;
  note?: string;
}

export interface EngineApproval {
  id: string;
  taskId: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: DateString;
  respondedAt?: DateString;
  expectedTurnaroundDays: number;
}

export interface WorkCalendar {
  workingDaysOfWeek: number[]; // e.g. [1, 2, 3, 4, 5]
  holidays: DateString[];
}

export interface EngineInput {
  tasks: EngineTask[];
  dependencies: Dependency[];
  resources: EngineResource[];
  availability: ResourceAvailability[];
  approvals: EngineApproval[];
  calendar: WorkCalendar;
  today: DateString;
}

export interface ScheduledTask {
  taskId: string;
  start: DateString;
  finish: DateString;
  assigneeId?: string;
  hoursPerDay: number;
  slackDays: number; // deadline - finish (in working days)
  isCritical: boolean;
  isConflict: boolean; // negative slack on fixed deadline
  conflictReason?: string;
  assumptionNotes: string[];
}

export type Schedule = Record<string, ScheduledTask>;

export type ReasonCode =
  | 'DEPENDENCY_DELAYED'
  | 'DEADLINE_MOVED'
  | 'RESOURCE_OVERLOAD'
  | 'RESOURCE_UNAVAILABLE'
  | 'APPROVAL_PENDING'
  | 'DURATION_CHANGED'
  | 'DEPENDENCY_CHANGED'
  | 'SHIFTED_FOR_FIXED_DEADLINE';

export type Change =
  | { type: 'MOVE_DEADLINE'; taskId: string; newDueDate: DateString }
  | { type: 'DELAY_APPROVAL'; approvalId: string; extraDays: number }
  | { type: 'APPROVE'; approvalId: string; approvedDate: DateString }
  | { type: 'CHANGE_DURATION'; taskId: string; newEstimatedHours: number }
  | { type: 'RESOURCE_UNAVAILABLE'; resourceId: string; dateFrom: DateString; dateTo: DateString; hoursPerDay: number; note?: string }
  | { type: 'COMPLETE_TASK'; taskId: string; completedAt: DateString }
  | { type: 'ADD_DEPENDENCY'; taskId: string; dependsOnTaskId: string }
  | { type: 'REMOVE_DEPENDENCY'; taskId: string; dependsOnTaskId: string }
  | { type: 'ADD_NEW_DEAL'; tasks: EngineTask[]; dependencies: Dependency[] };

export interface MovedTask {
  taskId: string;
  fromStart: DateString;
  toStart: DateString;
  fromFinish: DateString;
  toFinish: DateString;
  shiftDays: number;
  reasonCode: ReasonCode;
  reasonText: string;
  provenance: Provenance;
}

export interface ConflictEntry {
  taskId: string;
  type: 'DEADLINE_MISSED' | 'RESOURCE_OVERLOAD';
  daysShort?: number;
  message: string;
}

export interface ChangeAnalysis {
  baseline: Schedule;
  proposed: Schedule;
  directlyAffected: string[];
  downstreamAffected: Array<{ taskId: string; path: string[] }>;
  moved: MovedTask[];
  conflicts: ConflictEntry[];
  preservedFixed: string[];
  constraintsConsidered: string[];
  assumptionsUsed: Array<{ taskId?: string; assumption: string }>;
  summary: {
    affectedCount: number;
    movedCount: number;
    conflictCount: number;
    fixedBrokenCount: number;
  };
}

export interface ResolutionAlternative {
  type: 'RENEGOTIATE_DEADLINE' | 'ADD_HOURS' | 'REDUCE_SCOPE';
  description: string;
  calculatedDate?: DateString;
  extraHoursNeeded?: Array<{ date: DateString; resourceId: string; hours: number }>;
  candidatesToDrop?: Array<{ taskId: string; daysSaved: number }>;
}

export interface ResolutionResult {
  status: 'FEASIBLE' | 'FEASIBLE_WITH_CHANGES' | 'INFEASIBLE';
  proposedSchedule: Schedule;
  strategyUsed: string | null;
  alternatives?: ResolutionAlternative[];
  unresolvedConflicts: Array<{ taskId: string; message: string }>;
}

export interface RiskAlert {
  id: string; // Deterministic stable hash/identifier
  ruleId:
    | 'OVERDUE_TASK'
    | 'FIXED_DEADLINE_MISSED'
    | 'OVERDUE_PAYMENT'
    | 'BLOCKED_NEAR_DEADLINE'
    | 'NEGATIVE_SLACK_FLEXIBLE'
    | 'LOW_SLACK'
    | 'APPROVAL_OVERDUE'
    | 'MISSING_ESTIMATE'
    | 'INCOMPLETE_COST';
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  kind: 'potential' | 'confirmed';
  campaignId?: string;
  taskId?: string;
  evidence: Array<{ label: string; value: string | number }>;
  reason: string;
  recommendedAction: string;
  relevantDate?: DateString;
}

export interface EngineFinancialData {
  invoices: Array<{ id: string; campaignId: string; amount: number; status: string; dueDate: DateString }>;
  payments: Array<{ invoiceId: string; amount: number; receivedAt: DateString }>;
  expenses: Array<{ campaignId: string; amount: number }>;
}
