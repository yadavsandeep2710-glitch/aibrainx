import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ success: true });

    // Clear the admin session cookie
    response.cookies.delete('admin_session');

    // Also clear the old cookie just in case
    response.cookies.delete('admin_authenticated');

    return response;
}
