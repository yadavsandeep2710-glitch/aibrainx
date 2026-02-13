# Admin Dashboard Security Setup

The admin dashboard is now secured with a dedicated **Password Authentication** system.
Regular users sign in with Google (for reviews), while Admins sign in with a username and password.

## 🔐 Default Credentials

- **Username**: `admin`
- **Password**: `admin123`

## 🚀 How to Access

1.  Go to `/admin`
2.  You will be redirected to the **Admin Login** page.
3.  Enter the credentials above.

## ⚙️ Changing the Password

Passwords are stored securely as SHA-256 hashes in the `admin_auth` table.

To change the password:

1.  Generate a SHA-256 hash of your new password.
    -   You can use an online generator or run this Node.js command:
        ```bash
        node -e "console.log(require('crypto').createHash('sha256').update('YOUR_NEW_PASSWORD').digest('hex'))"
        ```
2.  Update the database record in Supabase SQL Editor:
    ```sql
    UPDATE admin_auth
    SET password_hash = 'YOUR_NEW_HASHED_PASSWORD'
    WHERE username = 'admin';
    ```

## ➕ Adding New Admins

To add a new admin user:

1.  Generate the hash for their password.
2.  Run SQL:
    ```sql
    INSERT INTO admin_auth (username, password_hash)
    VALUES ('new_admin', 'THE_HASHED_PASSWORD');
    ```
