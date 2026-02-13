import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function POST() {
    const supabase = createClient();

    // Sign out from Supabase
    await supabase.auth.signOut();

    return NextResponse.json({ success: true });
}

