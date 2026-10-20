import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export type StepState = 'done' | 'current' | 'upcoming';

export interface WorkflowStep {
  id: string;
  label: string;
  state: StepState;
}

export interface StepTrackerProps {
  steps?: WorkflowStep[];
  currentStepIndex?: number;
  className?: string;
}

const DEFAULT_STEPS: string[] = ['Brief', 'Script', 'Approval', 'Filming', 'Editing', 'Published'];

export function StepTracker({
  steps,
  currentStepIndex = 2, // Default: Approval
  className,
}: StepTrackerProps) {
  const resolvedSteps: WorkflowStep[] = steps || DEFAULT_STEPS.map((label, index) => {
    let state: StepState = 'upcoming';
    if (index < currentStepIndex) state = 'done';
    else if (index === currentStepIndex) state = 'current';
    return { id: label.toLowerCase(), label, state };
  });

  return (
    <div className={cn('w-full py-4 space-y-3', className)}>
      <div className="flex items-center justify-between text-xs font-semibold text-text-secondary uppercase tracking-wider">
        <span>Deliverable Lifecycle</span>
        <span className="font-mono text-[11px] text-accent-strong">
          Step {Math.min(currentStepIndex + 1, resolvedSteps.length)} of {resolvedSteps.length}
        </span>
      </div>

      <div className="relative flex items-center justify-between">
        {/* Connecting Line */}
        <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-0.5 bg-border -z-0" />

        {resolvedSteps.map((step, idx) => {
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              {/* Step Circle */}
              {step.state === 'done' && (
                <div className="w-6 h-6 rounded-full bg-text-primary text-text-inverse flex items-center justify-center shadow-sm">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              )}

              {step.state === 'current' && (
                <div className="w-6 h-6 rounded-full bg-surface border-2 border-accent flex items-center justify-center shadow-sm ring-4 ring-accent-tint">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
              )}

              {step.state === 'upcoming' && (
                <div className="w-6 h-6 rounded-full bg-surface-inset border border-border flex items-center justify-center">
                  <span className="text-[10px] font-mono text-text-tertiary font-bold">{idx + 1}</span>
                </div>
              )}

              {/* Label */}
              <span
                className={cn(
                  'text-[10px] sm:text-[11px] mt-1.5 font-medium transition-colors text-center truncate max-w-[54px] sm:max-w-none',
                  step.state === 'current' && 'text-text-primary font-bold',
                  step.state === 'done' && 'text-text-secondary font-semibold',
                  step.state === 'upcoming' && 'text-text-tertiary'
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
