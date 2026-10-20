/**
 * CREATOR FLOW: Deterministic Marcus Vance Demo Scenario Fixture
 * Engine-only domain fixture with zero database or UI dependencies.
 * Reference date: 2026-04-13 (Monday).
 */

import {
  DateString,
  EngineApproval,
  EngineFinancialData,
  EngineInput,
  EngineResource,
  EngineTask,
  ResourceAvailability,
  WorkCalendar,
} from '../../lib/engine/types';

export const TODAY_DEMO: DateString = '2026-04-13'; // Monday

export const CALENDAR_DEMO: WorkCalendar = {
  workingDaysOfWeek: [1, 2, 3, 4, 5], // Monday through Friday
  holidays: [],
};

export const RES_CREATOR: EngineResource = {
  id: 'res-creator',
  name: 'Marcus Vance',
  role: 'creator',
  hoursPerDay: 8,
  workingDays: [1, 2, 3, 4, 5],
};

export const RES_EDITOR_1: EngineResource = {
  id: 'res-editor-1',
  name: 'Leo Santos',
  role: 'editor',
  hoursPerDay: 8,
  workingDays: [1, 2, 3, 4, 5],
};

export const RES_EDITOR_2: EngineResource = {
  id: 'res-editor-2',
  name: 'Kai Vance',
  role: 'editor',
  hoursPerDay: 8,
  workingDays: [1, 2, 3, 4, 5],
};

export const AVAILABILITY_DEMO: ResourceAvailability[] = [
  {
    resourceId: RES_EDITOR_2.id,
    dateFrom: '2026-04-16',
    dateTo: '2026-04-20',
    hoursPerDay: 4, // Kai has limited half-day availability next week
    note: 'Coaching masterclass',
  },
];

export const APPROVALS_DEMO: EngineApproval[] = [
  {
    id: 'app-brand-b-script',
    taskId: 'task-b3-script-approval',
    status: 'pending',
    requestedAt: '2026-04-08',
    expectedTurnaroundDays: 2, // Overdue today (3 working days waiting vs 2 expected)
  },
];

export const TASKS_DEMO: EngineTask[] = [
  // Brand A: YouTube 90s Integration (Fixed deadline Monday 2026-04-20, demo moves it to 2026-04-16)
  {
    id: 'task-a1-brief',
    campaignId: 'camp-a',
    title: 'Brand A: Brief & Talking Points Intake',
    status: 'done',
    priority: 'high',
    estimatedHours: 2,
    deadlineType: 'flexible',
    assigneeId: RES_CREATOR.id,
    completedAt: '2026-04-09',
  },
  {
    id: 'task-a2-script',
    campaignId: 'camp-a',
    title: 'Brand A: Script Drafting (VPN Segment)',
    status: 'done',
    priority: 'high',
    estimatedHours: 4,
    deadlineType: 'flexible',
    assigneeId: RES_CREATOR.id,
    completedAt: '2026-04-10',
  },
  {
    id: 'task-a3-signoff',
    campaignId: 'camp-a',
    title: 'Brand A: Client Script Sign-off',
    status: 'done',
    priority: 'urgent',
    estimatedHours: 1,
    deadlineType: 'flexible',
    assigneeId: RES_CREATOR.id,
    completedAt: '2026-04-10',
  },
  {
    id: 'task-a4-film',
    campaignId: 'camp-a',
    title: 'Brand A: Film Primary A-Roll & UI B-Roll',
    status: 'in_progress',
    priority: 'urgent',
    estimatedHours: 6,
    startDate: '2026-04-13',
    dueDate: '2026-04-13',
    deadlineType: 'fixed',
    assigneeId: RES_CREATOR.id,
  },
  {
    id: 'task-a5-rough-cut',
    campaignId: 'camp-a',
    title: 'Brand A: Rough Cut & Pacing Assembly',
    status: 'not_started',
    priority: 'urgent',
    estimatedHours: 6,
    dueDate: '2026-04-14',
    deadlineType: 'fixed',
    assigneeId: RES_EDITOR_1.id,
  },
  {
    id: 'task-a6-audio-color',
    campaignId: 'camp-a',
    title: 'Brand A: Audio Master & Color Polish',
    status: 'not_started',
    priority: 'urgent',
    estimatedHours: 4,
    dueDate: '2026-04-15',
    deadlineType: 'fixed',
    assigneeId: RES_EDITOR_1.id,
  },
  {
    id: 'task-a7-submission',
    campaignId: 'camp-a',
    title: 'Brand A: Submit Cut for Brand Approval',
    status: 'not_started',
    priority: 'urgent',
    estimatedHours: 1,
    dueDate: '2026-04-17', // Initial deadline
    deadlineType: 'fixed',
    assigneeId: RES_CREATOR.id,
  },
  {
    id: 'task-a8-publish',
    campaignId: 'camp-a',
    title: 'Brand A: Public Release on YouTube',
    status: 'not_started',
    priority: 'high',
    estimatedHours: 2,
    dueDate: '2026-04-20',
    deadlineType: 'flexible',
    assigneeId: RES_CREATOR.id,
  },

  // Brand B: Headphone Review (Blocked on script approval)
  {
    id: 'task-b1-audio-bench',
    campaignId: 'camp-b',
    title: 'Brand B: Benchmark Audio Testing',
    status: 'done',
    priority: 'medium',
    estimatedHours: 5,
    deadlineType: 'flexible',
    assigneeId: RES_CREATOR.id,
    completedAt: '2026-04-10',
  },
  {
    id: 'task-b2-script-draft',
    campaignId: 'camp-b',
    title: 'Brand B: Script Draft & Talking Points',
    status: 'done',
    priority: 'high',
    estimatedHours: 4,
    deadlineType: 'flexible',
    assigneeId: RES_CREATOR.id,
    completedAt: '2026-04-10',
  },
  {
    id: 'task-b3-script-approval',
    campaignId: 'camp-b',
    title: 'Brand B: Awaiting Brand Script Approval',
    status: 'blocked',
    priority: 'urgent',
    estimatedHours: 1,
    dueDate: '2026-04-13',
    deadlineType: 'fixed',
    assigneeId: RES_CREATOR.id,
  },
  {
    id: 'task-b4-studio-film',
    campaignId: 'camp-b',
    title: 'Brand B: Studio Filming (Apex Stage 4B)',
    status: 'blocked',
    priority: 'urgent',
    estimatedHours: 8,
    deadlineType: 'flexible',
    assigneeId: RES_CREATOR.id,
  },
  {
    id: 'task-b5-rough-cut',
    campaignId: 'camp-b',
    title: 'Brand B: Rough Cut Editing (Aura ANC)',
    status: 'not_started',
    priority: 'high',
    estimatedHours: 8,
    deadlineType: 'flexible',
    assigneeId: RES_EDITOR_1.id,
  },
  {
    id: 'task-b6-sound-design',
    campaignId: 'camp-b',
    title: 'Brand B: Sound Design & ANC Noise Simulation',
    status: 'not_started',
    priority: 'high',
    estimatedHours: 5,
    deadlineType: 'flexible',
    assigneeId: RES_EDITOR_2.id,
  },
  {
    id: 'task-b7-submission',
    campaignId: 'camp-b',
    title: 'Brand B: Delivery for Final Legal Sign-off',
    status: 'not_started',
    priority: 'urgent',
    estimatedHours: 1,
    dueDate: '2026-04-21',
    deadlineType: 'fixed',
    assigneeId: RES_CREATOR.id,
  },

  // Brand C: Instagram Reel (Flexible window)
  {
    id: 'task-c1-3d-assets',
    campaignId: 'camp-c',
    title: 'Brand C: 3D Asset Collection & Presets',
    status: 'done',
    priority: 'medium',
    estimatedHours: 3,
    deadlineType: 'flexible',
    assigneeId: RES_CREATOR.id,
    completedAt: '2026-04-10',
  },
  {
    id: 'task-c2-screen-capture',
    campaignId: 'camp-c',
    title: 'Brand C: Vertical Reel Capture & VO',
    status: 'in_progress',
    priority: 'medium',
    estimatedHours: 4,
    startDate: '2026-04-13',
    dueDate: '2026-04-14',
    deadlineType: 'flexible',
    assigneeId: RES_CREATOR.id,
  },
  {
    id: 'task-c3-fast-cuts',
    campaignId: 'camp-c',
    title: 'Brand C: Fast Cuts & Kinetic Typography Edit',
    status: 'not_started',
    priority: 'medium',
    estimatedHours: 5,
    dueDate: '2026-04-16',
    deadlineType: 'flexible',
    assigneeId: RES_EDITOR_1.id, // Shares Leo Santos with Brand A!
  },
  {
    id: 'task-c4-utm-links',
    campaignId: 'camp-c',
    title: 'Brand C: Link & UTM Parameter Verification',
    status: 'not_started',
    priority: 'low',
    estimatedHours: 1,
    dueDate: '2026-04-17',
    deadlineType: 'flexible',
    assigneeId: RES_CREATOR.id,
  },
  {
    id: 'task-c5-upload-reel',
    campaignId: 'camp-c',
    title: 'Brand C: Instagram Reel Upload & Post',
    status: 'not_started',
    priority: 'high',
    estimatedHours: 1,
    dueDate: '2026-04-17',
    deadlineType: 'flexible',
    assigneeId: RES_CREATOR.id,
  },
];

export const DEPENDENCIES_DEMO = [
  // Brand A chain
  { taskId: 'task-a2-script', dependsOnTaskId: 'task-a1-brief' },
  { taskId: 'task-a3-signoff', dependsOnTaskId: 'task-a2-script' },
  { taskId: 'task-a4-film', dependsOnTaskId: 'task-a3-signoff' },
  { taskId: 'task-a5-rough-cut', dependsOnTaskId: 'task-a4-film' },
  { taskId: 'task-a6-audio-color', dependsOnTaskId: 'task-a5-rough-cut' },
  { taskId: 'task-a7-submission', dependsOnTaskId: 'task-a6-audio-color' },
  { taskId: 'task-a8-publish', dependsOnTaskId: 'task-a7-submission' },

  // Brand B chain
  { taskId: 'task-b2-script-draft', dependsOnTaskId: 'task-b1-audio-bench' },
  { taskId: 'task-b3-script-approval', dependsOnTaskId: 'task-b2-script-draft' },
  { taskId: 'task-b4-studio-film', dependsOnTaskId: 'task-b3-script-approval' },
  { taskId: 'task-b5-rough-cut', dependsOnTaskId: 'task-b4-studio-film' },
  { taskId: 'task-b6-sound-design', dependsOnTaskId: 'task-b5-rough-cut' },
  { taskId: 'task-b7-submission', dependsOnTaskId: 'task-b6-sound-design' },

  // Brand C chain
  { taskId: 'task-c2-screen-capture', dependsOnTaskId: 'task-c1-3d-assets' },
  { taskId: 'task-c3-fast-cuts', dependsOnTaskId: 'task-c2-screen-capture' },
  { taskId: 'task-c4-utm-links', dependsOnTaskId: 'task-c3-fast-cuts' },
  { taskId: 'task-c5-upload-reel', dependsOnTaskId: 'task-c4-utm-links' },
];

export const FINANCIAL_DEMO: EngineFinancialData = {
  invoices: [
    {
      id: 'inv-001',
      campaignId: 'camp-a',
      amount: 9250,
      status: 'paid',
      dueDate: '2026-05-01',
    },
    {
      id: 'inv-002',
      campaignId: 'camp-a',
      amount: 9250,
      status: 'draft',
      dueDate: '2026-05-15',
    },
    {
      id: 'inv-003',
      campaignId: 'camp-c',
      amount: 3500,
      status: 'overdue',
      dueDate: '2026-04-01', // Overdue!
    },
  ],
  payments: [
    {
      invoiceId: 'inv-001',
      amount: 9250,
      receivedAt: '2026-04-05',
    },
  ],
  expenses: [
    { campaignId: 'camp-a', amount: 1450 },
    { campaignId: 'camp-b', amount: 820 },
  ],
};

export function createDemoEngineInput(): EngineInput {
  return {
    tasks: TASKS_DEMO.map(t => ({ ...t })),
    dependencies: DEPENDENCIES_DEMO.map(d => ({ ...d })),
    resources: [RES_CREATOR, RES_EDITOR_1, RES_EDITOR_2].map(r => ({
      ...r,
      workingDays: [...r.workingDays],
    })),
    availability: AVAILABILITY_DEMO.map(a => ({ ...a })),
    approvals: APPROVALS_DEMO.map(a => ({ ...a })),
    calendar: {
      workingDaysOfWeek: [...CALENDAR_DEMO.workingDaysOfWeek],
      holidays: [...CALENDAR_DEMO.holidays],
    },
    today: TODAY_DEMO,
  };
}
