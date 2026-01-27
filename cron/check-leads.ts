/**
 * Cron job script to check for abandoned leads
 * 
 * This script is meant to be run on a schedule (e.g., every 5 minutes)
 * It calls the /api/cron/check-leads endpoint on your main server
 * 
 * Usage with Railway Cron:
 * 1. Create a new service in Railway
 * 2. Set it as a "Cron" type with schedule "*/5 * * * *" (every 5 minutes)
 * 3. Set the start command to: npx tsx cron/check-leads.ts
 * 4. Add environment variables: APP_URL, CRON_SECRET
 */

import 'dotenv/config';

const APP_URL = process.env.APP_URL || process.env.RAILWAY_PUBLIC_DOMAIN;
const CRON_SECRET = process.env.CRON_SECRET;

async function checkAbandonedLeads() {
  if (!APP_URL) {
    console.error('[Cron] APP_URL not set. Please set APP_URL environment variable.');
    process.exit(1);
  }

  const url = APP_URL.startsWith('http') 
    ? `${APP_URL}/api/cron/check-leads`
    : `https://${APP_URL}/api/cron/check-leads`;

  console.log(`[Cron] Calling ${url}...`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Cron-Secret': CRON_SECRET || '',
      },
    });

    if (!response.ok) {
      console.error(`[Cron] Request failed with status ${response.status}`);
      const text = await response.text();
      console.error('[Cron] Response:', text);
      process.exit(1);
    }

    const result = await response.json();
    console.log('[Cron] Success:', result);
    process.exit(0);
  } catch (error) {
    console.error('[Cron] Error:', error);
    process.exit(1);
  }
}

checkAbandonedLeads();
