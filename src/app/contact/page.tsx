'use client';

import { useState } from 'react';
import { submitContactMessage } from '@/lib/store';
import styles from './page.module.css';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        const result = submitContactMessage(form);
        setStatus(result);
        if (result.success) {
            setForm({ name: '', email: '', subject: '', message: '' });
        }
        setSubmitting(false);
    };

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>Contact Us</h1>
                    <p className={styles.pageSubtitle}>Have a question, suggestion, or business inquiry? We&apos;d love to hear from you.</p>
                </div>

                <div className={styles.grid}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        {status && (
                            <div className={`${styles.statusMsg} ${status.success ? styles.statusSuccess : styles.statusError}`}>
                                {status.message}
                            </div>
                        )}
                        <div className="input-group">
                            <label>Your Name *</label>
                            <input type="text" className="input-field" placeholder="Rahul Sharma" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                        </div>
                        <div className="input-group">
                            <label>Email Address *</label>
                            <input type="email" className="input-field" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                        </div>
                        <div className="input-group">
                            <label>Subject *</label>
                            <select className="input-field" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required>
                                <option value="">Select a subject</option>
                                <option value="Tool Listing">Tool Listing Inquiry</option>
                                <option value="Partnership">Partnership / Collaboration</option>
                                <option value="Bug Report">Bug Report</option>
                                <option value="Feedback">General Feedback</option>
                                <option value="Advertising">Advertising / Sponsorship</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Message *</label>
                            <textarea className="input-field" placeholder="Tell us more..." rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                            {submitting ? 'Sending...' : '📨 Send Message'}
                        </button>
                    </form>

                    <div className={styles.infoSidebar}>
                        <div className={styles.infoCard}>
                            <h3>📧 Email</h3>
                            <p><a href="mailto:contact@aibrainx.in">contact&#64;aibrainx.in</a></p>
                        </div>
                        <div className={styles.infoCard}>
                            <h3>⏰ Response Time</h3>
                            <p>We typically respond within 24 hours on business days.</p>
                        </div>
                        <div className={styles.infoCard}>
                            <h3>💼 Business Inquiries</h3>
                            <p>For partnership and advertising: <strong>contact&#64;aibrainx.in</strong></p>
                        </div>
                        <div className={styles.infoCard}>
                            <h3>🌍 Location</h3>
                            <p>Based in India 🇮🇳<br />Serving AI enthusiasts worldwide</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
