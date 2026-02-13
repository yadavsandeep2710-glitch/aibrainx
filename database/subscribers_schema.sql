-- Email Subscribers Schema
-- Manage email lists and automation

CREATE TABLE IF NOT EXISTS email_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    list_type TEXT NOT NULL CHECK (list_type IN ('free_guide', 'paid_customer', 'newsletter')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
    source TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email automation tracking
CREATE TABLE IF NOT EXISTS email_automation_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subscriber_id UUID REFERENCES email_subscribers(id) ON DELETE CASCADE,
    email_type TEXT NOT NULL,
    sequence_day INTEGER,
    sent_at TIMESTAMPTZ DEFAULT NOW(),
    opened_at TIMESTAMPTZ,
    clicked_at TIMESTAMPTZ,
    status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON email_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_list ON email_subscribers(list_type);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON email_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_automation_log_subscriber ON email_automation_log(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_automation_log_type ON email_automation_log(email_type);
