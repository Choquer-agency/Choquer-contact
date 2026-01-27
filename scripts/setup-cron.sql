-- Setup pg_cron for abandoned lead detection
-- Run this after enabling pg_cron extension in Neon

-- Create a function to mark abandoned leads
CREATE OR REPLACE FUNCTION mark_abandoned_leads()
RETURNS INTEGER AS $$
DECLARE
  affected_count INTEGER;
BEGIN
  -- Mark leads as 'pending_email' if:
  -- - Not updated in last 10 minutes (user is gone)
  -- - Email hasn't been sent yet
  -- - Has meaningful data (name or email)
  -- - Not already completed or pending_email
  UPDATE leads
  SET 
    status = 'pending_email',
    updated_at = NOW()
  WHERE 
    email_sent = false
    AND status NOT IN ('completed', 'pending_email')
    AND updated_at < NOW() - INTERVAL '10 minutes'
    AND (
      (form_data->>'fullName' IS NOT NULL AND form_data->>'fullName' != '')
      OR (form_data->>'email' IS NOT NULL AND form_data->>'email' != '')
    );
  
  GET DIAGNOSTICS affected_count = ROW_COUNT;
  
  -- Log the result
  RAISE NOTICE 'Marked % leads as pending_email', affected_count;
  
  RETURN affected_count;
END;
$$ LANGUAGE plpgsql;

-- Schedule the cron job to run every 5 minutes
-- Note: You need pg_cron extension enabled first
SELECT cron.schedule(
  'mark-abandoned-leads',  -- job name
  '*/5 * * * *',           -- every 5 minutes
  'SELECT mark_abandoned_leads()'
);

-- To verify the job was created:
-- SELECT * FROM cron.job;

-- To remove the job if needed:
-- SELECT cron.unschedule('mark-abandoned-leads');
