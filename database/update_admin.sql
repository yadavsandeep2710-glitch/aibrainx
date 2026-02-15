-- Deleting potentially existing admin user with weak password
DELETE FROM admin_auth WHERE username = 'admin';

-- Inserting new secure admin user
-- Username: admin_master
-- Password: Xy9#mP2$vLn5@kR8
-- Hash: 51a94fbe1fc2d09d929b495c15f9dc80e449f30f7a9d8d55963d87a3857d8424
INSERT INTO admin_auth (username, password_hash)
VALUES ('admin_master', '51a94fbe1fc2d09d929b495c15f9dc80e449f30f7a9d8d55963d87a3857d8424')
ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash;
