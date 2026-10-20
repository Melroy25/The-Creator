-- Migration 003: Add Theme, Accent, and Workspace Settings to creator_profiles
-- CODE MEET 2026 Hackathon: CREATOR FLOW

ALTER TABLE creator_profiles 
ADD COLUMN IF NOT EXISTS theme_preference TEXT NOT NULL DEFAULT 'light' 
  CHECK (theme_preference IN ('light', 'system', 'dark')),
ADD COLUMN IF NOT EXISTS accent_preference TEXT NOT NULL DEFAULT 'amber' 
  CHECK (accent_preference IN ('amber', 'mint', 'pink', 'blue')),
ADD COLUMN IF NOT EXISTS settings JSONB NOT NULL DEFAULT '{
  "notifications": {
    "email": true,
    "push": false,
    "deadline_reminders": true
  },
  "low_stock_warning": true
}'::jsonb;
