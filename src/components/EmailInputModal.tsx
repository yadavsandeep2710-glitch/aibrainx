'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import styles from './EmailInputModal.module.css';
import { createPortal } from 'react-dom';

interface EmailInputModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (email: string) => void;
    title?: string;
    description?: string;
    loading?: boolean;
}

export default function EmailInputModal({
    isOpen,
    onClose,
    onSubmit,
    title = 'Enter Your Email',
    description = 'Please enter your email address to receive the download link.',
    loading = false
}: EmailInputModalProps) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            // Focus input when modal opens
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        onSubmit(email);
    };

    if (!mounted || !isOpen) return null;

    // Use portal to render modal at document root level
    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    ×
                </button>

                <h2 id="modal-title" className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email-input" className={styles.label}>
                            Email Address
                        </label>
                        <input
                            ref={inputRef}
                            id="email-input"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                            className={styles.input}
                            disabled={loading}
                        />
                    </div>

                    {error && (
                        <div className={styles.error}>
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Continue'}
                    </button>
                </form>
            </div>
        </div>,
        document.body
    );
}
