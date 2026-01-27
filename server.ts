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
  const resendApiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL;

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

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle SPA routing - serve index.html for all other routes
app.get('/{*path}', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
