import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            order_id,
        } = await request.json();

        // Verify signature
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(sign.toString())
            .digest('hex');

        if (razorpay_signature !== expectedSign) {
            return NextResponse.json(
                { error: 'Invalid payment signature' },
                { status: 400 }
            );
        }

        // Update order in database
        const supabase = await createServerSupabaseClient();

        const { data: order, error: updateError } = await supabase
            .from('orders')
            .update({
                payment_status: 'completed',
                razorpay_payment_id,
                razorpay_signature,
                payment_verified_at: new Date().toISOString(),
            })
            .eq('id', order_id)
            .select()
            .single();

        if (updateError) {
            console.error('Database error:', updateError);
            return NextResponse.json(
                { error: 'Failed to verify payment' },
                { status: 500 }
            );
        }

        // Create download token
        const { data: downloadToken } = await supabase
            .rpc('generate_download_token');

        // Get order items to create download records
        const { data: orderItems } = await supabase
            .from('order_items')
            .select('product_id')
            .eq('order_id', order_id);

        if (orderItems && orderItems.length > 0) {
            for (const item of orderItems) {
                await supabase.from('downloads').insert({
                    order_id,
                    product_id: item.product_id,
                    user_email: order.user_email,
                    download_token: downloadToken,
                    expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
                });
            }
        }

        // Send confirmation email with download link
        try {
            const { Resend } = await import('resend');
            const resend = new Resend(process.env.RESEND_API_KEY);

            const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/download?token=${downloadToken}`;

            await resend.emails.send({
                from: 'AIBrainX <noreply@aibrainx.in>',
                to: order.user_email, // Use order.user_email
                subject: 'Your AI Guide is Ready! 📚',
                html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                  .content { background: #f9fafb; padding: 30px; }
                  .button { display: inline-block; background: #10b981; color: white; padding: 15px 40px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
                  .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
                  .info-box { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>✅ Payment Successful!</h1>
                  </div>
                  <div class="content">
                    <p>Thank you for your purchase!</p>
                    <p>Your AI guide is ready to download. Click the button below to get instant access:</p>
                    <p style="text-align: center;">
                      <a href="${downloadUrl}" class="button">📥 Download Your Guide</a>
                    </p>
                    <div class="info-box">
                      <h3>📋 Order Details</h3>
                      <p><strong>Order ID:</strong> ${order.order_number}</p>
                      <p><strong>Amount Paid:</strong> ₹${order.total_amount_inr}</p>
                      <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
                    </div>
                    <p><strong>Important:</strong></p>
                    <ul>
                      <li>Save this email - your download link is valid for 1 year</li>
                      <li>You'll receive free updates when we update the guide</li>
                      <li>Need help? Reply to this email or contact support@aibrainx.in</li>
                    </ul>
                    <p>Thank you for choosing AIBrainX! 🎉</p>
                  </div>
                  <div class="footer">
                    <p>AIBrainX.in - Your trusted source for AI tools and guides</p>
                    <p><a href="https://aibrainx.in">Visit AIBrainX.in</a></p>
                  </div>
                </div>
              </body>
              </html>
            `,
            });
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            // Don't fail the request if email fails
        }

        return NextResponse.json({
            success: true,
            order_id,
            download_token: downloadToken,
        });
    } catch (error: any) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to verify payment' },
            { status: 500 }
        );
    }
}
