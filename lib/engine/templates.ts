/**
 * CREATOR FLOW: Deterministic Task Template Generator
 * Pure TypeScript. Generates production workflows with realistic dependency DAGs
 * tailored to deliverable type (long_video, reel/short_video, post).
 */

import { DateString, Dependency, EngineTask } from './types';

export type DeliverableType = 'long_video' | 'short_video' | 'reel' | 'post';

export interface TemplateGenerationParams {
  campaignId: string;
  deliverableType: DeliverableType;
  creatorResourceId: string;
  editorResourceId?: string;
  submissionDeadline: DateString;
  publishDate: DateString;
}

export interface GeneratedWorkflow {
  tasks: EngineTask[];
  dependencies: Dependency[];
}

/**
 * Generates an end-to-end task workflow DAG based on deliverable type.
 */
export function generateWorkflowTemplate(params: TemplateGenerationParams): GeneratedWorkflow {
  const {
    campaignId,
    deliverableType,
    creatorResourceId,
    editorResourceId = creatorResourceId,
    submissionDeadline,
    publishDate,
  } = params;

  const tasks: EngineTask[] = [];
  const dependencies: Dependency[] = [];
  const pfx = `gen-${campaignId.substring(0, 8)}`;

  const addDep = (taskId: string, dependsOnTaskId: string) => {
    dependencies.push({ taskId, dependsOnTaskId });
  };

  switch (deliverableType) {
    case 'long_video': {
      const t1: EngineTask = {
        id: `${pfx}-1-brief`,
        campaignId,
        title: 'Brief Review & Technical Angle',
        status: 'not_started',
        priority: 'high',
        estimatedHours: 2,
        deadlineType: 'flexible',
        assigneeId: creatorResourceId,
      };
      const t2: EngineTask = {
        id: `${pfx}-2-script`,
        campaignId,
        title: 'Script Drafting & Demo Storyboard',
        status: 'not_started',
        priority: 'high',
        estimatedHours: 5,
        deadlineType: 'flexible',
        assigneeId: creatorResourceId,
      };
      const t3: EngineTask = {
        id: `${pfx}-3-script-approval`,
        campaignId,
        title: 'Script Sign-off & Brand Approval',
        status: 'not_started',
        priority: 'urgent',
        estimatedHours: 1,
        deadlineType: 'flexible',
        assigneeId: creatorResourceId,
      };
      const t4: EngineTask = {
        id: `${pfx}-4-film`,
        campaignId,
        title: 'Film A-Roll & B-Roll Segments',
        status: 'not_started',
        priority: 'urgent',
        estimatedHours: 6,
        deadlineType: 'flexible',
        assigneeId: creatorResourceId,
      };
      const t5: EngineTask = {
        id: `${pfx}-5-rough-cut`,
        campaignId,
        title: 'Rough Cut Assembly & Pacing',
        status: 'not_started',
        priority: 'high',
        estimatedHours: 7,
        deadlineType: 'flexible',
        assigneeId: editorResourceId,
      };
      const t6: EngineTask = {
        id: `${pfx}-6-fine-cut`,
        campaignId,
        title: 'Audio Polish & Color Grading',
        status: 'not_started',
        priority: 'high',
        estimatedHours: 4,
        deadlineType: 'flexible',
        assigneeId: editorResourceId,
      };
      const t7: EngineTask = {
        id: `${pfx}-7-submission`,
        campaignId,
        title: 'Submit Cut for Brand Approval',
        status: 'not_started',
        priority: 'urgent',
        estimatedHours: 1,
        dueDate: submissionDeadline,
        deadlineType: 'fixed',
        assigneeId: creatorResourceId,
      };
      const t8: EngineTask = {
        id: `${pfx}-8-publish`,
        campaignId,
        title: 'Publish Video & Pinned Comment',
        status: 'not_started',
        priority: 'high',
        estimatedHours: 2,
        dueDate: publishDate,
        deadlineType: 'flexible',
        assigneeId: creatorResourceId,
      };

      tasks.push(t1, t2, t3, t4, t5, t6, t7, t8);
      addDep(t2.id, t1.id);
      addDep(t3.id, t2.id);
      addDep(t4.id, t3.id);
      addDep(t5.id, t4.id);
      addDep(t6.id, t5.id);
      addDep(t7.id, t6.id);
      addDep(t8.id, t7.id);
      break;
    }

    case 'reel':
    case 'short_video': {
      const t1: EngineTask = {
        id: `${pfx}-1-concept`,
        campaignId,
        title: 'Hook & Concept Storyboard',
        status: 'not_started',
        priority: 'medium',
        estimatedHours: 2,
        deadlineType: 'flexible',
        assigneeId: creatorResourceId,
      };
      const t2: EngineTask = {
        id: `${pfx}-2-record`,
        campaignId,
        title: 'Vertical Footage & Voiceover',
        status: 'not_started',
        priority: 'high',
        estimatedHours: 3,
        deadlineType: 'flexible',
        assigneeId: creatorResourceId,
      };
      const t3: EngineTask = {
        id: `${pfx}-3-edit`,
        campaignId,
        title: 'Kinetic Subtitles & Fast-Paced Edit',
        status: 'not_started',
        priority: 'high',
        estimatedHours: 4,
        deadlineType: 'flexible',
        assigneeId: editorResourceId,
      };
      const t4: EngineTask = {
        id: `${pfx}-4-submission`,
        campaignId,
        title: 'Brand Approval Submission',
        status: 'not_started',
        priority: 'urgent',
        estimatedHours: 1,
        dueDate: submissionDeadline,
        deadlineType: 'fixed',
        assigneeId: creatorResourceId,
      };
      const t5: EngineTask = {
        id: `${pfx}-5-publish`,
        campaignId,
        title: 'Upload Short & Engagement Monitoring',
        status: 'not_started',
        priority: 'high',
        estimatedHours: 1,
        dueDate: publishDate,
        deadlineType: 'flexible',
        assigneeId: creatorResourceId,
      };

      tasks.push(t1, t2, t3, t4, t5);
      addDep(t2.id, t1.id);
      addDep(t3.id, t2.id);
      addDep(t4.id, t3.id);
      addDep(t5.id, t4.id);
      break;
    }

    case 'post': {
      const t1: EngineTask = {
        id: `${pfx}-1-draft`,
        campaignId,
        title: 'Draft Carousel & Talking Points',
        status: 'not_started',
        priority: 'medium',
        estimatedHours: 2,
        deadlineType: 'flexible',
        assigneeId: creatorResourceId,
      };
      const t2: EngineTask = {
        id: `${pfx}-2-graphics`,
        campaignId,
        title: 'Export Infographics & Visual Slides',
        status: 'not_started',
        priority: 'medium',
        estimatedHours: 2,
        deadlineType: 'flexible',
        assigneeId: editorResourceId,
      };
      const t3: EngineTask = {
        id: `${pfx}-3-approval`,
        campaignId,
        title: 'Client Sign-off on Final Assets',
        status: 'not_started',
        priority: 'urgent',
        estimatedHours: 1,
        dueDate: submissionDeadline,
        deadlineType: 'fixed',
        assigneeId: creatorResourceId,
      };
      const t4: EngineTask = {
        id: `${pfx}-4-post`,
        campaignId,
        title: 'Publish Feed Post & Engage Community',
        status: 'not_started',
        priority: 'medium',
        estimatedHours: 1,
        dueDate: publishDate,
        deadlineType: 'flexible',
        assigneeId: creatorResourceId,
      };

      tasks.push(t1, t2, t3, t4);
      addDep(t2.id, t1.id);
      addDep(t3.id, t2.id);
      addDep(t4.id, t3.id);
      break;
    }
  }

  return { tasks, dependencies };
}
