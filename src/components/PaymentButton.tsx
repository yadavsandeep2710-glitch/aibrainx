'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './PaymentButton.module.css';
import EmailInputModal from './EmailInputModal';

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
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();


    const handlePaymentClick = () => {
        setShowModal(true);
    };

    const processPayment = async (email: string) => {
        setLoading(true);
        // We can close the modal immediately or keep it open with a loading state. 
        // For better UX, let's keep the modal open with loading state if strict, 
        // but here the button logic was handling everything.
        // Let's close the modal and let the button show loading state?
        // Actually the button shows loading. 
        // But the modal is over it.
        // Let's close the modal and show loading on the button?
        // Or better, let the modal show loading?
        // The original code set loading on the button.

        // Let's close modal for now to start the process on the main page context
        setShowModal(false);

        try {
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
                    email: email,
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
        <>
            <button
                onClick={handlePaymentClick}
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

            <EmailInputModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={processPayment}
                title="Complete Your Purchase"
                description={`Enter your email to receive the download link for ${productTitle}`}
            />
        </>
    );
}
