import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        // Hash the password
        const passwordHash = crypto
            .createHash('sha256')
            .update(password)
            .digest('hex');

        // Verify credentials in database
        const supabase = await createServerSupabaseClient();

        const { data, error } = await supabase
            .from('admin_auth')
            .select('*')
            .eq('username', username)
            .eq('password_hash', passwordHash)
            .single();

        if (error || !data) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Create success response
        const response = NextResponse.json({ success: true });

        // Set secure HTTP-only cookie
        response.cookies.set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
