import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function setupDatabase() {
  console.log('Creating leads table...');
  
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      session_id VARCHAR(255) UNIQUE NOT NULL,
      status VARCHAR(50) DEFAULT 'in_progress',
      current_step INTEGER DEFAULT 0,
      form_data JSONB NOT NULL DEFAULT '{}',
      email_sent BOOLEAN DEFAULT FALSE,
      spam_risk VARCHAR(10),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;
  
  console.log('✅ Leads table created successfully!');
  
  // Create an index on session_id for faster lookups
  await sql`
    CREATE INDEX IF NOT EXISTS idx_leads_session_id ON leads(session_id)
  `;
  
  // Create an index on spam_risk for filtering
  await sql`
    CREATE INDEX IF NOT EXISTS idx_leads_spam_risk ON leads(spam_risk)
  `;
  
  console.log('✅ Indexes created successfully!');
}

setupDatabase()
  .then(() => {
    console.log('Database setup complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error setting up database:', error);
    process.exit(1);
  });
