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

// CORS Configuration for Webflow
const ALLOWED_ORIGINS = [
  'https://choquer.webflow.io',
  'https://www.choquer.agency',
  'https://choquer.agency',
  'http://localhost:1327', // Local development
  'http://localhost:3000',
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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
  // Anti-spam fields
  _honeypot?: string;
  _step2StartTime?: number;
  _step2Duration?: number;
}

type SpamRisk = 'LOW' | 'MEDIUM' | 'HIGH';

// Disposable email domains to flag
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com', 'guerrillamail.com', 'mailinator.com', 'throwaway.email',
  '10minutemail.com', 'temp-mail.org', 'fakeinbox.com', 'trashmail.com',
  'getnada.com', 'maildrop.cc', 'sharklasers.com', 'grr.la', 'yopmail.com'
];

// Check if URL actually resolves
async function checkUrlValidity(urlString: string): Promise<'valid' | 'invalid' | 'timeout'> {
  try {
    const url = new URL(urlString.startsWith('http') ? urlString : `https://${urlString}`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(url.origin, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
    });
    
    clearTimeout(timeoutId);
    return response.ok || response.status < 500 ? 'valid' : 'invalid';
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      return 'timeout';
    }
    return 'invalid';
  }
}

// Check if email is from a disposable domain
function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? DISPOSABLE_EMAIL_DOMAINS.includes(domain) : false;
}

// Get AI spam assessment using Claude
async function getAiSpamAssessment(formData: FormData): Promise<SpamRisk> {
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!anthropicApiKey) {
    console.log('[SpamCheck] No Anthropic API key configured, defaulting to MEDIUM');
    return 'MEDIUM';
  }

  try {
    const prompt = `Assess this lead's spam risk. Reply with ONLY one word: LOW, MEDIUM, or HIGH.

Consider these factors:
- Is the name realistic? (not keyboard spam like "asdfgh")
- Does the email look legitimate? (not disposable/temporary)
- Is there coherent, relevant content in their responses?
- Does the company name match a real business pattern?
- Does the context provided (if any) make sense for a business inquiry?

Lead data:
Name: ${formData.fullName}
Email: ${formData.email}
Company: ${formData.companyName}
Website: ${formData.companyUrl}
Looking for: ${formData.lookingFor.join(', ') || 'Not specified'}
Additional context: ${formData.anythingElse || 'None provided'}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 10,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      console.error('[SpamCheck] AI API error:', response.status);
      return 'MEDIUM';
    }

    const data = await response.json();
    const text = data.content?.[0]?.text?.trim().toUpperCase();
    
    if (text === 'LOW' || text === 'MEDIUM' || text === 'HIGH') {
      return text as SpamRisk;
    }
    
    console.log('[SpamCheck] Unexpected AI response:', text);
    return 'MEDIUM';
  } catch (error) {
    console.error('[SpamCheck] AI assessment failed:', error);
    return 'MEDIUM';
  }
}

// Calculate overall spam risk
async function calculateSpamRisk(formData: FormData): Promise<SpamRisk> {
  let riskPoints = 0;
  const reasons: string[] = [];

  // Factor 1: URL validity
  const urlStatus = await checkUrlValidity(formData.companyUrl);
  if (urlStatus === 'invalid') {
    riskPoints += 3;
    reasons.push('invalid URL');
  } else if (urlStatus === 'timeout') {
    riskPoints += 1;
    reasons.push('URL timeout');
  }

  // Factor 2: Disposable email
  if (isDisposableEmail(formData.email)) {
    riskPoints += 3;
    reasons.push('disposable email');
  }

  // Factor 3: Step 2 timing (if available)
  const step2Duration = formData._step2Duration;
  if (step2Duration !== undefined) {
    if (step2Duration < 5000) {
      riskPoints += 2;
      reasons.push('very fast form completion');
    } else if (step2Duration < 10000) {
      riskPoints += 1;
      reasons.push('fast form completion');
    }
  }

  // Factor 4: AI assessment (only if we have concerning signals or want full coverage)
  const aiRisk = await getAiSpamAssessment(formData);
  if (aiRisk === 'HIGH') {
    riskPoints += 3;
    reasons.push('AI flagged as suspicious');
  } else if (aiRisk === 'MEDIUM') {
    riskPoints += 1;
    reasons.push('AI has minor concerns');
  }

  // Calculate final risk
  let finalRisk: SpamRisk;
  if (riskPoints >= 4) {
    finalRisk = 'HIGH';
  } else if (riskPoints >= 2) {
    finalRisk = 'MEDIUM';
  } else {
    finalRisk = 'LOW';
  }

  console.log(`[SpamCheck] Risk: ${finalRisk} (${riskPoints} points) - Factors: ${reasons.join(', ') || 'none'}`);
  return finalRisk;
}

interface LeadPayload {
  sessionId: string;
  formData: FormData;
  currentStep: number;
  trigger?: 'abandoned' | 'completed';
  aiSummary?: AiSummary;
}

interface AiSummary {
  situationAnalysis: string;
  mistake: string;
  nextStep: string;
}

// Generate AI Summary endpoint (moved from frontend for security)
app.post('/api/generate-summary', async (req, res) => {
  const formData = req.body as FormData;
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

  if (!anthropicApiKey) {
    console.log('[GenerateSummary] No Anthropic API key configured');
    return res.json({
      situationAnalysis: "We've received your information and are processing it.",
      mistake: "Our AI analysis tool is temporarily unavailable — but don't worry, your submission was captured.",
      nextStep: "Our team will review your details manually and reach out shortly. Thank you for your patience."
    } as AiSummary);
  }

  try {
    // Detect if user provided substantive free-text input
    const hasDetailedContext = formData.anythingElse?.trim().length > 50;

    // Add priority instructions when detailed context exists
    const contextPriorityInstructions = hasDetailedContext ? `
CRITICAL PRIORITY — USER'S OWN WORDS:
The user has provided detailed context in their own words below. This is the MOST IMPORTANT input and should heavily influence your response.
- Directly reference their specific interests, technologies, or solutions they mentioned (e.g., AI, chatbots, automation, specific tools)
- Validate their thinking — affirm that their ideas are valuable and forward-thinking
- Position Choquer as experienced and capable of delivering exactly what they've described
- Your response should feel like you truly heard what they wrote, not a generic template

User's Detailed Context:
"${formData.anythingElse}"

` : '';

    const prompt = `You are generating a strategic perspective for a prospective client reaching out to Choquer Agency, a senior-level web, SEO, CRO, and AI-forward marketing partner.

Context:
- The user has intentionally selected the services they believe will help them grow.
- Assume they are already thinking in the right direction.
- Your role is to reflect their situation clearly, validate their instincts, and elevate their thinking — not to correct or contradict them.
${contextPriorityInstructions}
Prospective Client Data:
Name: ${formData.fullName}
Company: ${formData.companyName} (${formData.companyUrl})
Services Selected: ${formData.lookingFor?.join(", ") || 'Not specified'}
Current Website Status: ${formData.currentWebsite || 'Not specified'}
Team Situation: ${formData.teamSituation || 'Not specified'}
Traffic Reality: ${formData.trafficReality || 'Not specified'}
Desired Outcomes: ${formData.hopingFor?.join(", ") || 'Not specified'}
${!hasDetailedContext && formData.anythingElse ? `Additional Context: ${formData.anythingElse}` : ''}

Instructions:
Generate a concise, high-confidence strategic summary in JSON format with exactly three fields.

Tone & Style Guidelines:
- Insightful, calm, and experienced
- Empathetic and validating
- No blame, no shaming, no "you did this wrong"
- Speak as a partner who has seen this pattern many times
- Treat website, SEO, CRO, and systems as interconnected — never isolated

Required Fields:

1. situationAnalysis - Complete this: "Most companies in your position are dealing with [X], which usually points to [Y]."
2. mistake - Complete this: "What we often see at this stage is teams getting stuck in [common tension or tradeoff], even when they know what they want to improve."
3. nextStep - Complete this: "If that resonates, the next step isn't [tactical action] — it's clarity around [Choquer principle], so everything works together."

IMPORTANT: Keep each field concise - maximum 180 characters per field.

Respond ONLY with valid JSON in this exact format: {"situationAnalysis": "...", "mistake": "...", "nextStep": "..."}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      console.error('[GenerateSummary] AI API error:', response.status);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const text = data.content?.[0]?.text;

    if (!text) {
      throw new Error("No response from AI");
    }

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Could not parse JSON from response");

    const parsed = JSON.parse(jsonMatch[0]) as AiSummary;

    // Truncate if needed
    const truncate = (str: string, maxLen: number) => str.length > maxLen ? str.substring(0, maxLen - 3) + '...' : str;

    res.json({
      situationAnalysis: truncate(parsed.situationAnalysis, 200),
      mistake: truncate(parsed.mistake, 200),
      nextStep: truncate(parsed.nextStep, 200),
    } as AiSummary);

  } catch (error) {
    console.error('[GenerateSummary] Error:', error);
    res.json({
      situationAnalysis: "We've received your information and are processing it.",
      mistake: "Our AI analysis tool is temporarily unavailable — but don't worry, your submission was captured.",
      nextStep: "Our team will review your details manually and reach out shortly. Thank you for your patience."
    } as AiSummary);
  }
});

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
  trigger: 'abandoned' | 'completed',
  spamRisk?: SpamRisk | null,
  aiSummary?: AiSummary | null
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

  // Add spam risk indicator to subject if HIGH
  const spamIndicator = spamRisk === 'HIGH' ? '🚨 ' : spamRisk === 'MEDIUM' ? '⚡ ' : '';
  
  const subject = isCompleted
    ? `${spamIndicator}✅ New Lead: ${formData.fullName || 'Unknown'} - Form Completed`
    : `${spamIndicator}⚠️ Abandoned Lead: ${formData.fullName || 'Unknown'} - Left at ${stepLabel}`;

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
    ${spamRisk ? `
    <div style="margin-top: 12px; display: inline-block; padding: 6px 12px; border-radius: 4px; font-size: 14px; font-weight: 600; background: ${spamRisk === 'HIGH' ? '#DC2626' : spamRisk === 'MEDIUM' ? '#F59E0B' : '#10B981'};">
      Spam Risk: ${spamRisk}
    </div>
    ` : ''}
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

    ${aiSummary ? `
    <h2 style="color: #111; font-size: 18px; margin-top: 24px;">🤖 AI Summary Shown to Lead</h2>
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <p style="margin: 0 0 12px 0; font-style: italic; color: #92400e;"><strong>Situation:</strong> ${aiSummary.situationAnalysis}</p>
      <p style="margin: 0 0 12px 0; font-style: italic; color: #92400e;"><strong>Common Challenge:</strong> ${aiSummary.mistake}</p>
      <p style="margin: 0; font-style: italic; color: #92400e;"><strong>Next Step:</strong> ${aiSummary.nextStep}</p>
    </div>
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
    const { sessionId, formData, currentStep, trigger, aiSummary } = payload;

    console.log(`[API] Lead received - Session: ${sessionId?.slice(0, 8)}..., Step: ${currentStep}, Trigger: ${trigger || 'none'}${aiSummary ? ', with AI summary' : ''}`);

    if (!sessionId) {
      console.log('[API] Error: No session ID');
      return res.status(400).json({ error: 'Session ID required' });
    }

    // HONEYPOT CHECK: If the hidden field has any value, it's a bot
    if (formData._honeypot) {
      console.log(`[API] SPAM BLOCKED - Honeypot triggered by session ${sessionId.slice(0, 8)}`);
      // Return success to not alert the bot, but don't save anything
      return res.json({ success: true, leadId: 'blocked' });
    }

    // Connect to Neon - clean up any hidden characters from env var
    const cleanDbUrl = (process.env.DATABASE_URL || '').trim().replace(/^[^p]+/, '');
    const sql = neon(cleanDbUrl);

    // Determine status
    const status = trigger || 'in_progress';

    // Calculate spam risk (only on final submission to avoid API calls on every keystroke)
    let spamRisk: SpamRisk | null = null;
    if (trigger === 'completed' || trigger === 'abandoned') {
      spamRisk = await calculateSpamRisk(formData);
    }

    // Clean formData - remove internal anti-spam fields before storing
    const cleanFormData = { ...formData };
    delete cleanFormData._honeypot;
    delete cleanFormData._step2StartTime;
    delete cleanFormData._step2Duration;

    // Upsert lead data
    const result = await sql`
      INSERT INTO leads (session_id, status, current_step, form_data, spam_risk, updated_at)
      VALUES (${sessionId}, ${status}, ${currentStep}, ${JSON.stringify(cleanFormData)}::jsonb, ${spamRisk}, NOW())
      ON CONFLICT (session_id) 
      DO UPDATE SET 
        status = ${status},
        current_step = ${currentStep},
        form_data = ${JSON.stringify(cleanFormData)}::jsonb,
        spam_risk = COALESCE(${spamRisk}, leads.spam_risk),
        updated_at = NOW()
      RETURNING id, email_sent, spam_risk
    `;

    const lead = result[0];

    // If this is a final trigger (abandoned/completed) and email hasn't been sent yet
    if (trigger && !lead.email_sent) {
      const emailSent = await sendNotificationEmail(formData, currentStep, trigger, lead.spam_risk as SpamRisk | null, aiSummary);

      if (emailSent) {
        // Mark email as sent
        await sql`
          UPDATE leads 
          SET email_sent = true 
          WHERE session_id = ${sessionId}
        `;
      }
    }

    res.json({ success: true, leadId: lead.id, spamRisk: lead.spam_risk });
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
// Supports both GET (Railway cron) and POST (manual triggers)
app.all('/api/cron/check-leads', async (req, res) => {
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

      // Calculate spam risk if not already set
      let spamRisk = lead.spam_risk as SpamRisk | null;
      if (!spamRisk) {
        spamRisk = await calculateSpamRisk(formData);
      }

      const emailSent = await sendNotificationEmail(formData, currentStep, 'abandoned', spamRisk);

      if (emailSent) {
        // Mark email as sent, update status, and save spam risk
        await sql`
          UPDATE leads 
          SET email_sent = true, status = 'abandoned', spam_risk = ${spamRisk}
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

      // Calculate spam risk
      const spamRisk = await calculateSpamRisk(formData);
      const emailSent = await sendNotificationEmail(formData, currentStep, 'abandoned', spamRisk);

      // Update lead status regardless of email success (to prevent infinite retries)
      await sql`
        UPDATE leads 
        SET 
          email_sent = ${emailSent}, 
          status = 'abandoned',
          spam_risk = ${spamRisk},
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
