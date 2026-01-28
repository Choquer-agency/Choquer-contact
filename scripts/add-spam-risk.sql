-- Migration: Add spam_risk column to leads table
-- Run this SQL in your Neon console or via a migration tool

-- Add the spam_risk column
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS spam_risk VARCHAR(10);

-- Add a comment explaining the column
COMMENT ON COLUMN leads.spam_risk IS 'Spam risk assessment: LOW, MEDIUM, or HIGH';

-- Optional: Create an index for filtering by spam risk
CREATE INDEX IF NOT EXISTS idx_leads_spam_risk ON leads(spam_risk);

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'leads' AND column_name = 'spam_risk';
