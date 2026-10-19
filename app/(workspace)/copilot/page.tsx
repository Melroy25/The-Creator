import React from 'react';
import { PageHeader, EmptyState, SecondaryButton } from '@/components/shared';
import { Bot, MessageSquarePlus } from 'lucide-react';

export default function CopilotPage() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Creator Copilot & Message Assistant"
        purpose="AI conversational copilot grounded strictly in real database and engine facts. Drafts sponsor communications and follow-ups as 'Draft, not sent'."
        badge="Autonomous Pipeline Reasoning"
        badgeVariant="primary"
        actions={
          <SecondaryButton size="sm" icon={<MessageSquarePlus className="w-4 h-4" />}>
            New Conversation
          </SecondaryButton>
        }
      />

      <EmptyState
        title="Creator Copilot & Message Assistant Coming in Phase 9"
        description="The tool-calling copilot agent and copyable sponsor message drafters (always tagged 'Draft, not sent') will be activated in Phase 9."
        icon={<Bot className="w-7 h-7 text-indigo-400" />}
      />
    </div>
  );
}
