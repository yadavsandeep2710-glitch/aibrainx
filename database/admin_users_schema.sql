-- Create admin_users table to store authorized admin emails
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only allow reading (no one can modify through the client)
CREATE POLICY "Admin list is publicly readable"
    ON admin_users FOR SELECT
    USING (true);

-- Insert your admin email (REPLACE WITH YOUR ACTUAL EMAIL)
INSERT INTO admin_users (email) VALUES ('your-email@gmail.com');

-- Example: Add more admins if needed
-- INSERT INTO admin_users (email) VALUES ('another-admin@gmail.com');
