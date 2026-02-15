import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
    try {
        const { email, name, list_type, source } = await request.json();

        if (!email || !list_type) {
            return NextResponse.json(
                { error: 'Email and list type are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const supabase = await createServerSupabaseClient();

        // Check if email already exists
        const { data: existing } = await supabase
            .from('email_subscribers')
            .select('id, status')
            .eq('email', email)
            .single();

        if (existing) {
            if (existing.status === 'active') {
                return NextResponse.json(
                    { error: 'Email already subscribed' },
                    { status: 400 }
                );
            }

            // Reactivate if previously unsubscribed
            await supabase
                .from('email_subscribers')
                .update({
                    status: 'active',
                    list_type,
                    unsubscribed_at: null,
                })
                .eq('id', existing.id);
        } else {
            // Create new subscriber
            await supabase.from('email_subscribers').insert({
                email,
                name,
                list_type,
                source,
                status: 'active',
            });
        }

        // TODO: Send welcome email with free guide
        // This would integrate with Resend or similar email service
        // For free_guide list_type, send the free PDF
        // For other lists, send welcome email

        // Send welcome email with free guide
        if (list_type === 'free_guide') {
            try {
                const { Resend } = await import('resend');
                const resend = new Resend(process.env.RESEND_API_KEY);

                await resend.emails.send({
                    from: process.env.RESEND_FROM_EMAIL || 'AIBrainX <noreply@aibrainx.in>',
                    to: email,
                    subject: 'Your Free AI Tools Guide is Here! 🎁',
                    html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f9fafb; padding: 30px; }
                .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎉 Welcome to AIBrainX!</h1>
                </div>
                <div class="content">
                  <p>Hi${name ? ` ${name}` : ''},</p>
                  <p>Thank you for subscribing! Here's your free guide: <strong>Top 25 Free AI Tools for Students & Creators</strong>.</p>
                  <p style="text-align: center;">
                    <a href="https://aibrainx.in/downloads/free-ai-guide.pdf" class="button">📥 Download Your Free Guide</a>
                  </p>
                  <p><strong>What's inside:</strong></p>
                  <ul>
                    <li>25 completely free AI tools (not just free trials)</li>
                    <li>Organized by category: Writing, Design, Video, Coding, Research</li>
                    <li>Quick start guides for each tool</li>
                    <li>Best use cases and recommendations</li>
                  </ul>
                  <p>Want more? Check out our <a href="https://aibrainx.in/ai-guides">Premium AI Guides</a> with detailed comparisons and pricing in ₹.</p>
                </div>
                <div class="footer">
                  <p>You're receiving this because you signed up for our free AI guide at AIBrainX.in</p>
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
        }

        return NextResponse.json({
            success: true,
            message: 'Successfully subscribed',
        });
    } catch (error: any) {
        console.error('Subscription error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to subscribe' },
            { status: 500 }
        );
    }
}
