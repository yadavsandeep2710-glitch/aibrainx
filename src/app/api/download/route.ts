import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const orderId = searchParams.get('order');
        const token = searchParams.get('token');

        if (!orderId && !token) {
            return NextResponse.json(
                { error: 'Order ID or download token required' },
                { status: 400 }
            );
        }

        const supabase = await createServerSupabaseClient();

        let download;

        if (token) {
            // Get download by token
            const { data, error } = await supabase
                .from('downloads')
                .select('*, products(file_url, title)')
                .eq('download_token', token)
                .single();

            if (error || !data) {
                return NextResponse.json(
                    { error: 'Invalid download token' },
                    { status: 404 }
                );
            }

            download = data;
        } else if (orderId) {
            // Get download by order
            const { data, error } = await supabase
                .from('downloads')
                .select('*, products(file_url, title)')
                .eq('order_id', orderId)
                .single();

            if (error || !data) {
                return NextResponse.json(
                    { error: 'Download not found for this order' },
                    { status: 404 }
                );
            }

            download = data;
        }

        // Check if expired
        if (download.expires_at && new Date(download.expires_at) < new Date()) {
            return NextResponse.json(
                { error: 'Download link has expired' },
                { status: 410 }
            );
        }

        // Update download count
        await supabase
            .from('downloads')
            .update({
                download_count: (download.download_count || 0) + 1,
                last_downloaded_at: new Date().toISOString(),
            })
            .eq('id', download.id);

        // Return download URL
        // In production, this would be a signed S3 URL or similar
        return NextResponse.json({
            download_url: download.products?.file_url || '/placeholder-guide.pdf',
            product_title: download.products?.title,
            download_token: download.download_token,
        });
    } catch (error: any) {
        console.error('Download error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to get download' },
            { status: 500 }
        );
    }
}
