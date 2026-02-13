CREATE TABLE IF NOT EXISTS admin_auth (
  username TEXT PRIMARY KEY,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Default admin user (username: admin, password: admin123)
-- SHA-256 hash of 'admin123' generated via:
-- node -e "console.log(require('crypto').createHash('sha256').update('admin123').digest('hex'))"
INSERT INTO admin_auth (username, password_hash)
VALUES ('admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9')
ON CONFLICT (username) DO NOTHING;
