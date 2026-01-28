import 'dotenv/config';
import express from 'express';
import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Debug: Log DATABASE_URL on startup (first 50 chars only for security)
const dbUrl = process.env.DATABASE_URL || '';
console.log('[Startup] DATABASE_URL length:', dbUrl.length);
console.log('[Startup] DATABASE_URL first 50 chars:', JSON.stringify(dbUrl.slice(0, 50)));
console.log('[Startup] DATABASE_URL char codes:', Array.from(dbUrl.slice(0, 10)).map(c => c.charCodeAt(0)));

// Middleware
app.use(express.json());

// Types
interface FormData {
  fullName: string;
  email: string;
  companyName: string;
  companyUrl: string;
  phone: string;
  lookingFor: string[];
  currentWebsite: string;
  teamSituation: string;
  trafficReality: string;
  hopingFor: string[];
  anythingElse: string;
}

interface LeadPayload {
  sessionId: string;
  formData: FormData;
  currentStep: number;
  trigger?: 'abandoned' | 'completed';
}

// Step labels for email
const STEP_LABELS = [
  'Nice To Meet You',
  'What Are You Looking For',
  'Where Are You Right Now',
  'What Are You Hoping For',
  'Anything Else',
  'Summary'
];

// Email sending function
async function sendNotificationEmail(
  formData: FormData,
  currentStep: number,
  trigger: 'abandoned' | 'completed'
): Promise<boolean> {
  // Clean up environment variables (remove any hidden characters like tabs or = signs)
  const resendApiKey = (process.env.RESEND_API_KEY || '').trim().replace(/^[^r]+/, '');
  const notificationEmail = (process.env.LEAD_NOTIFICATION_EMAIL || '').trim().replace(/^[^a-zA-Z]+/, '');

  console.log(`[Email] Using notification email: ${notificationEmail}`);

  if (!resendApiKey || !notificationEmail) {
    console.warn('Email configuration missing - RESEND_API_KEY or LEAD_NOTIFICATION_EMAIL not set');
    return false;
  }

  const resend = new Resend(resendApiKey);

  const isCompleted = trigger === 'completed';
  const stepLabel = STEP_LABELS[currentStep] || `Step ${currentStep}`;

  const subject = isCompleted
    ? `✅ New Lead: ${formData.fullName || 'Unknown'} - Form Completed`
    : `⚠️ Abandoned Lead: ${formData.fullName || 'Unknown'} - Left at ${stepLabel}`;

  const completionPercentage = Math.round((currentStep / 5) * 100);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <div style="background: ${isCompleted ? '#10B981' : '#F59E0B'}; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 24px;">
      ${isCompleted ? '✅ Form Completed' : '⚠️ Form Abandoned'}
    </h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">
      ${isCompleted ? 'A new lead has completed the full form!' : `Lead left at: ${stepLabel} (${completionPercentage}% complete)`}
    </p>
  </div>

  <div style="border: 1px solid #e5e7eb; border-top: none; padding: 20px; border-radius: 0 0 8px 8px;">
    
    <h2 style="color: #111; font-size: 18px; margin-top: 0;">Contact Information</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 140px;">Name</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-weight: 500;">${formData.fullName || '—'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Email</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
          <a href="mailto:${formData.email}" style="color: #2563eb; text-decoration: none;">${formData.email || '—'}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Phone</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${formData.phone || '—'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Company</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${formData.companyName || '—'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Website</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
          ${formData.companyUrl ? `<a href="${formData.companyUrl}" style="color: #2563eb; text-decoration: none;">${formData.companyUrl}</a>` : '—'}
        </td>
      </tr>
    </table>

    ${formData.lookingFor.length > 0 ? `
    <h2 style="color: #111; font-size: 18px; margin-top: 24px;">Looking For</h2>
    <ul style="margin: 0; padding-left: 20px;">
      ${formData.lookingFor.map(item => `<li style="margin-bottom: 4px;">${item}</li>`).join('')}
    </ul>
    ` : ''}

    ${formData.currentWebsite || formData.teamSituation || formData.trafficReality ? `
    <h2 style="color: #111; font-size: 18px; margin-top: 24px;">Current Situation</h2>
    <table style="width: 100%; border-collapse: collapse;">
      ${formData.currentWebsite ? `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 140px;">Website Status</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${formData.currentWebsite}</td>
      </tr>
      ` : ''}
      ${formData.teamSituation ? `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Team</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${formData.teamSituation}</td>
      </tr>
      ` : ''}
      ${formData.trafficReality ? `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280;">Traffic</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${formData.trafficReality}</td>
      </tr>
      ` : ''}
    </table>
    ` : ''}

    ${formData.hopingFor.length > 0 ? `
    <h2 style="color: #111; font-size: 18px; margin-top: 24px;">Hoping For</h2>
    <ul style="margin: 0; padding-left: 20px;">
      ${formData.hopingFor.map(item => `<li style="margin-bottom: 4px;">${item}</li>`).join('')}
    </ul>
    ` : ''}

    ${formData.anythingElse ? `
    <h2 style="color: #111; font-size: 18px; margin-top: 24px;">Additional Context</h2>
    <p style="margin: 0; background: #f9fafb; padding: 12px; border-radius: 6px; white-space: pre-wrap;">${formData.anythingElse}</p>
    ` : ''}

    <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
      <p style="margin: 0;">Lead captured at ${new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'full',
        timeStyle: 'short'
      })} ET</p>
    </div>

  </div>

</body>
</html>
  `;

  try {
    console.log(`[Email] Attempting to send ${trigger} notification to ${notificationEmail}`);
    
    const result = await resend.emails.send({
      from: 'Choquer Contact <contactform@choquer.agency>',
      to: notificationEmail,
      subject,
      html,
    });

    console.log(`[Email] Sent successfully for ${trigger} lead: ${formData.email || 'no email'}`, result);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send:', error);
    return false;
  }
}

// API endpoint for lead tracking
app.post('/api/lead', async (req, res) => {
  try {
    const payload: LeadPayload = req.body;
    const { sessionId, formData, currentStep, trigger } = payload;

    console.log(`[API] Lead received - Session: ${sessionId?.slice(0, 8)}..., Step: ${currentStep}, Trigger: ${trigger || 'none'}`);

    if (!sessionId) {
      console.log('[API] Error: No session ID');
      return res.status(400).json({ error: 'Session ID required' });
    }

    // Connect to Neon - clean up any hidden characters from env var
    const cleanDbUrl = (process.env.DATABASE_URL || '').trim().replace(/^[^p]+/, '');
    const sql = neon(cleanDbUrl);

    // Determine status
    const status = trigger || 'in_progress';

    // Upsert lead data
    const result = await sql`
      INSERT INTO leads (session_id, status, current_step, form_data, updated_at)
      VALUES (${sessionId}, ${status}, ${currentStep}, ${JSON.stringify(formData)}::jsonb, NOW())
      ON CONFLICT (session_id) 
      DO UPDATE SET 
        status = ${status},
        current_step = ${currentStep},
        form_data = ${JSON.stringify(formData)}::jsonb,
        updated_at = NOW()
      RETURNING id, email_sent
    `;

    const lead = result[0];

    // If this is a final trigger (abandoned/completed) and email hasn't been sent yet
    if (trigger && !lead.email_sent) {
      const emailSent = await sendNotificationEmail(formData, currentStep, trigger);

      if (emailSent) {
        // Mark email as sent
        await sql`
          UPDATE leads 
          SET email_sent = true 
          WHERE session_id = ${sessionId}
        `;
      }
    }

    res.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error('Lead API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// TEST endpoint - sends a test email
app.get('/api/test-email', async (_req, res) => {
  console.log('[Test] Sending test email...');
  
  const resendApiKey = (process.env.RESEND_API_KEY || '').trim().replace(/^[^r]+/, '');
  if (!resendApiKey) {
    return res.status(500).json({ success: false, error: 'RESEND_API_KEY not configured' });
  }
  const resend = new Resend(resendApiKey);
  
  try {
    const result = await resend.emails.send({
      from: 'Choquer Contact <contactform@choquer.agency>',
      to: 'bryce@choquer.agency',
      subject: '🧪 Test Email - Lead Tracking Works!',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h1 style="color: #F97316;">Test Email Successful!</h1>
          <p>If you're reading this, your Resend integration is working correctly.</p>
          <p>Sent at: ${new Date().toLocaleString()}</p>
        </div>
      `,
    });
    
    console.log('[Test] Email result:', result);
    res.json({ success: true, result });
  } catch (error) {
    console.error('[Test] Email error:', error);
    res.status(500).json({ success: false, error: String(error) });
  }
});

// Cron endpoint to check for abandoned leads
// This runs every 5 minutes via Railway cron job
app.post('/api/cron/check-leads', async (req, res) => {
  // Verify cron secret to prevent unauthorized access
  const cronSecret = process.env.CRON_SECRET;
  const providedSecret = req.headers['x-cron-secret'] || req.query.secret;
  
  if (cronSecret && providedSecret !== cronSecret) {
    console.log('[Cron] Unauthorized request - invalid secret');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log('[Cron] Starting abandoned lead check...');

  try {
    // Connect to Neon
    const cleanDbUrl = (process.env.DATABASE_URL || '').trim().replace(/^[^p]+/, '');
    const sql = neon(cleanDbUrl);

    // Find leads that:
    // - Haven't been updated in the last 10 minutes (user is gone)
    // - Haven't had an email sent yet
    // - Have at least some meaningful data (name or email)
    // - Are not already marked as 'completed'
    const abandonedLeads = await sql`
      SELECT id, session_id, current_step, form_data, status
      FROM leads
      WHERE 
        email_sent = false
        AND status != 'completed'
        AND updated_at < NOW() - INTERVAL '10 minutes'
        AND (
          form_data->>'fullName' IS NOT NULL AND form_data->>'fullName' != ''
          OR form_data->>'email' IS NOT NULL AND form_data->>'email' != ''
        )
    `;

    console.log(`[Cron] Found ${abandonedLeads.length} abandoned leads to process`);

    let emailsSent = 0;
    for (const lead of abandonedLeads) {
      const formData = lead.form_data as FormData;
      const currentStep = lead.current_step as number;

      console.log(`[Cron] Processing lead ${lead.session_id.slice(0, 8)}... - Step ${currentStep}`);

      const emailSent = await sendNotificationEmail(formData, currentStep, 'abandoned');

      if (emailSent) {
        // Mark email as sent and update status
        await sql`
          UPDATE leads 
          SET email_sent = true, status = 'abandoned'
          WHERE id = ${lead.id}
        `;
        emailsSent++;
      }
    }

    console.log(`[Cron] Completed - sent ${emailsSent} emails`);
    res.json({ 
      success: true, 
      processed: abandonedLeads.length, 
      emailsSent 
    });

  } catch (error) {
    console.error('[Cron] Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle SPA routing - serve index.html for all other routes
app.get('/{*path}', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Function to process pending email leads (marked by pg_cron in Neon)
async function processPendingEmailLeads() {
  try {
    const cleanDbUrl = (process.env.DATABASE_URL || '').trim().replace(/^[^p]+/, '');
    if (!cleanDbUrl) {
      console.log('[EmailProcessor] No DATABASE_URL configured');
      return;
    }

    const sql = neon(cleanDbUrl);

    // Find leads marked as 'pending_email' by pg_cron
    const pendingLeads = await sql`
      SELECT id, session_id, current_step, form_data, status
      FROM leads
      WHERE status = 'pending_email' AND email_sent = false
      LIMIT 10
    `;

    if (pendingLeads.length === 0) {
      return; // No pending leads
    }

    console.log(`[EmailProcessor] Found ${pendingLeads.length} pending leads to process`);

    for (const lead of pendingLeads) {
      const formData = lead.form_data as FormData;
      const currentStep = lead.current_step as number;

      console.log(`[EmailProcessor] Processing lead ${lead.session_id.slice(0, 8)}...`);

      const emailSent = await sendNotificationEmail(formData, currentStep, 'abandoned');

      // Update lead status regardless of email success (to prevent infinite retries)
      await sql`
        UPDATE leads 
        SET 
          email_sent = ${emailSent}, 
          status = 'abandoned',
          updated_at = NOW()
        WHERE id = ${lead.id}
      `;

      if (emailSent) {
        console.log(`[EmailProcessor] Email sent for lead ${lead.session_id.slice(0, 8)}`);
      } else {
        console.log(`[EmailProcessor] Email failed for lead ${lead.session_id.slice(0, 8)}`);
      }
    }
  } catch (error) {
    console.error('[EmailProcessor] Error:', error);
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Process any pending leads on startup
  processPendingEmailLeads();
  
  // Check for pending leads every 60 seconds
  setInterval(processPendingEmailLeads, 60 * 1000);
  console.log('[EmailProcessor] Started - checking every 60 seconds');
});
