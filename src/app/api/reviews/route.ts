import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function getSupabaseClient() {
    const cookieStore = await cookies();
    return createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) =>
                    cookieStore.set(name, value, options)
                );
            },
        },
    });
}

// GET - Fetch reviews
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const content_type = searchParams.get('content_type');
        const content_id = searchParams.get('content_id');

        if (!content_type || !content_id) {
            return NextResponse.json(
                { error: 'content_type and content_id are required' },
                { status: 400 }
            );
        }

        const supabase = await getSupabaseClient();

        const { data: reviews, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('content_type', content_type)
            .eq('content_id', content_id)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ reviews });
    } catch (error: any) {
        console.error('Error fetching reviews:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch reviews' },
            { status: 500 }
        );
    }
}

// POST - Create review
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { content_type, content_id, rating, comment } = body;

        if (!content_type || !content_id || !rating || !comment) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { error: 'Rating must be between 1 and 5' },
                { status: 400 }
            );
        }

        const supabase = await getSupabaseClient();

        // Get current user
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'You must be signed in to post a review' },
                { status: 401 }
            );
        }

        // Insert review
        const { data: review, error } = await supabase
            .from('reviews')
            .insert({
                user_id: user.id,
                user_email: user.email!,
                user_name: user.user_metadata?.full_name || null,
                user_avatar: user.user_metadata?.avatar_url || null,
                content_type,
                content_id,
                rating,
                comment,
            })
            .select()
            .single();

        if (error) {
            if (error.code === '23505') {
                // Unique constraint violation
                return NextResponse.json(
                    { error: 'You have already reviewed this content' },
                    { status: 409 }
                );
            }
            throw error;
        }

        return NextResponse.json({ review }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating review:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create review' },
            { status: 500 }
        );
    }
}
