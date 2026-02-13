'use client';

import { useState, FormEvent } from 'react';
import styles from './EmailCaptureForm.module.css';

interface EmailCaptureFormProps {
    title?: string;
    description?: string;
    buttonText?: string;
    placeholder?: string;
    onSuccess?: () => void;
}

export default function EmailCaptureForm({
    title = 'Get Your Free Guide',
    description = 'Enter your email to receive instant access',
    buttonText = 'Get Free Guide',
    placeholder = 'your@email.com',
    onSuccess
}: EmailCaptureFormProps) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    name,
                    list_type: 'free_guide',
                    source: 'free-ai-guide-page'
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Subscription failed');
            }

            setSuccess(true);
            setEmail('');
            setName('');

            if (onSuccess) {
                onSuccess();
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3>Check Your Email!</h3>
                <p>We've sent your free guide to <strong>{email}</strong></p>
                <p className={styles.successNote}>
                    Don't see it? Check your spam folder or promotions tab.
                </p>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.header}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            {error && (
                <div className={styles.error}>
                    <span>⚠️</span> {error}
                </div>
            )}

            <div className={styles.fields}>
                <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                    disabled={loading}
                />

                <input
                    type="email"
                    placeholder={placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                    disabled={loading}
                />
            </div>

            <button
                type="submit"
                className={`btn btn-primary btn-lg ${styles.submit}`}
                disabled={loading}
            >
                {loading ? 'Sending...' : buttonText}
            </button>

            <p className={styles.privacy}>
                🔒 We respect your privacy. Unsubscribe anytime.
            </p>
        </form>
    );
}
