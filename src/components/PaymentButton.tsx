'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './PaymentButton.module.css';

interface PaymentButtonProps {
    productId: string;
    productTitle: string;
    amount: number;
    buttonText?: string;
    className?: string;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function PaymentButton({
    productId,
    productTitle,
    amount,
    buttonText = 'Buy Now',
    className = ''
}: PaymentButtonProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const handlePayment = async () => {
        setLoading(true);

        try {
            // Prompt for email
            const email = prompt('Please enter your email address to receive the download link:');

            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address');
                setLoading(false);
                return;
            }

            // Create order
            const orderResponse = await fetch('/api/payment/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId,
                    amount,
                    email
                })
            });

            const orderData = await orderResponse.json();

            if (!orderResponse.ok) {
                throw new Error(orderData.error || 'Failed to create order');
            }

            // Load Razorpay script if not already loaded
            if (!window.Razorpay) {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.async = true;
                document.body.appendChild(script);

                await new Promise((resolve) => {
                    script.onload = resolve;
                });
            }

            // Initialize Razorpay
            const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';

            if (!razorpayKey) {
                throw new Error('Razorpay key not configured. Please add NEXT_PUBLIC_RAZORPAY_KEY_ID to .env.local');
            }

            const options = {
                key: razorpayKey,
                amount: orderData.amount,
                currency: 'INR',
                name: 'AIBrainX.in',
                description: productTitle,
                order_id: orderData.razorpay_order_id,
                handler: async function (response: any) {
                    // Verify payment
                    const verifyResponse = await fetch('/api/payment/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            order_id: orderData.order_id
                        })
                    });

                    const verifyData = await verifyResponse.json();

                    if (verifyResponse.ok) {
                        // Redirect to thank you page
                        router.push(`/thank-you?order=${orderData.order_id}`);
                    } else {
                        alert('Payment verification failed. Please contact support.');
                    }
                },
                prefill: {
                    email: '',
                    contact: ''
                },
                theme: {
                    color: '#3b82f6'
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error: any) {
            alert(error.message || 'Payment failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className={`btn btn-primary btn-lg ${styles.paymentBtn} ${className}`}
        >
            {loading ? (
                <>
                    <span className={styles.spinner}></span>
                    Processing...
                </>
            ) : (
                <>
                    {buttonText} — ₹{amount}
                </>
            )}
        </button>
    );
}
