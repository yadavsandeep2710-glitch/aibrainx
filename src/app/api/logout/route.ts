import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function POST() {
    const supabase = await createServerSupabaseClient();

    // Sign out from Supabase
    await supabase.auth.signOut();

    return NextResponse.json({ success: true });
}

