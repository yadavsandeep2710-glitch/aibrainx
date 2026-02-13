import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
    try {
        const { productId, amount, email } = await request.json();

        if (!productId || !amount || !email) {
            return NextResponse.json(
                { error: 'Product ID, amount, and email are required' },
                { status: 400 }
            );
        }

        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: amount * 100, // Convert to paise
            currency: 'INR',
            receipt: `order_${Date.now()}`,
        });

        // Create order in database
        const supabase = await createServerSupabaseClient();

        const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .insert({
                order_number: razorpayOrder.receipt,
                user_email: email,
                total_amount_inr: amount,
                payment_status: 'pending',
                razorpay_order_id: razorpayOrder.id,
            })
            .select()
            .single();

        if (orderError) {
            console.error('Database error:', orderError);
            return NextResponse.json(
                { error: 'Failed to create order' },
                { status: 500 }
            );
        }

        // Create order item
        const { data: product } = await supabase
            .from('products')
            .select('title, price_inr')
            .eq('slug', productId)
            .single();

        if (product) {
            await supabase.from('order_items').insert({
                order_id: orderData.id,
                product_id: productId,
                product_title: product.title,
                price_inr: product.price_inr,
            });
        }

        return NextResponse.json({
            order_id: orderData.id,
            razorpay_order_id: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
        });
    } catch (error: any) {
        console.error('Payment creation error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create payment' },
            { status: 500 }
        );
    }
}
