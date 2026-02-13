'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

function ThankYouContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order');
    const [downloadUrl, setDownloadUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId) {
            // Fetch download link
            fetch(`/api/download?order=${orderId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.download_url) {
                        setDownloadUrl(data.download_url);
                    }
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [orderId]);

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.card}>
                    <div className={styles.icon}>✓</div>
                    <h1 className={styles.title}>Payment Successful!</h1>
                    <p className={styles.subtitle}>
                        Thank you for your purchase. Your order has been confirmed.
                    </p>

                    {loading ? (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                            <p>Preparing your download...</p>
                        </div>
                    ) : downloadUrl ? (
                        <div className={styles.download}>
                            <a
                                href={downloadUrl}
                                className="btn btn-primary btn-lg"
                                download
                            >
                                📥 Download Your Guide
                            </a>
                            <p className={styles.downloadNote}>
                                Your download will start automatically. If it doesn't, click the button above.
                            </p>
                        </div>
                    ) : (
                        <div className={styles.email}>
                            <p>
                                We've sent your download link to your email.
                                Check your inbox (and spam folder) for permanent access.
                            </p>
                        </div>
                    )}

                    <div className={styles.info}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoIcon}>📧</span>
                            <div>
                                <h3>Check Your Email</h3>
                                <p>We've sent you a confirmation email with a permanent download link.</p>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoIcon}>🔄</span>
                            <div>
                                <h3>Free Updates</h3>
                                <p>You'll receive free updates for 1 year whenever we update the guide.</p>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoIcon}>💬</span>
                            <div>
                                <h3>Need Help?</h3>
                                <p>Contact us at support@aibrainx.in if you have any questions.</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <Link href="/ai-guides" className="btn btn-secondary">
                            ← Back to AI Guides
                        </Link>
                        <Link href="/" className="btn btn-secondary">
                            Go to Homepage
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={<div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading...</div>}>
            <ThankYouContent />
        </Suspense>
    );
}
