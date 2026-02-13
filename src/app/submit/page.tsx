'use client';

import { useState } from 'react';
import { categories } from '@/lib/data';
import { submitToolListing } from '@/lib/store';
import styles from './page.module.css';

type Step = 1 | 2 | 3;

export default function SubmitToolPage() {
    const [step, setStep] = useState<Step>(1);
    const [formData, setFormData] = useState({
        toolName: '',
        toolUrl: '',
        description: '',
        categoryId: '',
        pricing: 'free',
        email: '',
        contactName: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        submitToolListing(formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className={styles.page}>
                <div className={styles.container}>
                    <div className={styles.successCard}>
                        <span className={styles.successIcon}>🎉</span>
                        <h2>Submission Received!</h2>
                        <p>Thank you for submitting your AI tool. Our team will review it within 48 hours.</p>
                        <p className={styles.successNote}>You&apos;ll receive a confirmation email at <strong>{formData.email}</strong></p>
                        <a href="/tools" className="btn btn-primary btn-lg" style={{ marginTop: '1.5rem' }}>
                            Browse AI Tools →
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>Submit Your AI Tool</h1>
                    <p className={styles.pageSubtitle}>
                        Get your AI tool listed on India&apos;s fastest-growing AI directory. Reach 10,000+ monthly visitors.
                    </p>
                </div>

                {/* Benefits */}
                <div className={styles.benefits}>
                    <div className={styles.benefitItem}>
                        <span>📋</span>
                        <div>
                            <strong>Detailed Listing</strong>
                            <p>Full page with description, screenshots, and pricing</p>
                        </div>
                    </div>
                    <div className={styles.benefitItem}>
                        <span>🔍</span>
                        <div>
                            <strong>SEO Optimized</strong>
                            <p>Google-indexed profile with structured data</p>
                        </div>
                    </div>
                    <div className={styles.benefitItem}>
                        <span>⭐</span>
                        <div>
                            <strong>User Reviews</strong>
                            <p>Collect ratings and reviews from Indian users</p>
                        </div>
                    </div>
                    <div className={styles.benefitItem}>
                        <span>🏆</span>
                        <div>
                            <strong>Featured Eligible</strong>
                            <p>Get featured on homepage and social media</p>
                        </div>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className={styles.steps}>
                    {[1, 2, 3].map(s => (
                        <div key={s} className={`${styles.step} ${step >= s ? styles.stepActive : ''} ${step === s ? styles.stepCurrent : ''}`}>
                            <span className={styles.stepNumber}>{s}</span>
                            <span className={styles.stepLabel}>{s === 1 ? 'Tool Info' : s === 2 ? 'Contact' : 'Payment'}</span>
                        </div>
                    ))}
                </div>

                {/* Form */}
                <div className={styles.formCard}>
                    {step === 1 && (
                        <div className={styles.formStep}>
                            <h2 className={styles.formTitle}>Tool Information</h2>

                            <div className="input-group">
                                <label htmlFor="toolName">Tool Name *</label>
                                <input id="toolName" type="text" className="input-field" placeholder="e.g. ChatGPT, Midjourney" value={formData.toolName} onChange={e => updateField('toolName', e.target.value)} />
                            </div>

                            <div className="input-group">
                                <label htmlFor="toolUrl">Tool Website URL *</label>
                                <input id="toolUrl" type="url" className="input-field" placeholder="https://your-tool.com" value={formData.toolUrl} onChange={e => updateField('toolUrl', e.target.value)} />
                            </div>

                            <div className="input-group">
                                <label htmlFor="description">Description *</label>
                                <textarea id="description" className="input-field" placeholder="Describe what your tool does, key features, and target audience..." rows={5} value={formData.description} onChange={e => updateField('description', e.target.value)} />
                            </div>

                            <div className="input-group">
                                <label htmlFor="category">Category *</label>
                                <select id="category" className="input-field" value={formData.categoryId} onChange={e => updateField('categoryId', e.target.value)}>
                                    <option value="">Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-group">
                                <label htmlFor="pricing">Pricing Model *</label>
                                <select id="pricing" className="input-field" value={formData.pricing} onChange={e => updateField('pricing', e.target.value)}>
                                    <option value="free">Free</option>
                                    <option value="freemium">Freemium</option>
                                    <option value="paid">Paid</option>
                                </select>
                            </div>

                            <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '1rem' }}
                                onClick={() => setStep(2)}
                                disabled={!formData.toolName || !formData.toolUrl || !formData.description || !formData.categoryId}
                            >
                                Continue →
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className={styles.formStep}>
                            <h2 className={styles.formTitle}>Contact Details</h2>

                            <div className="input-group">
                                <label htmlFor="contactName">Your Name *</label>
                                <input id="contactName" type="text" className="input-field" placeholder="Full name" value={formData.contactName} onChange={e => updateField('contactName', e.target.value)} />
                            </div>

                            <div className="input-group">
                                <label htmlFor="email">Email Address *</label>
                                <input id="email" type="email" className="input-field" placeholder="you@company.com" value={formData.email} onChange={e => updateField('email', e.target.value)} />
                            </div>

                            <div className={styles.formActions}>
                                <button className="btn btn-secondary btn-lg" onClick={() => setStep(1)}>← Back</button>
                                <button className="btn btn-primary btn-lg"
                                    onClick={() => setStep(3)}
                                    disabled={!formData.contactName || !formData.email}
                                >
                                    Continue →
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className={styles.formStep}>
                            <h2 className={styles.formTitle}>Review & Payment</h2>

                            <div className={styles.reviewSummary}>
                                <div className={styles.reviewItem}>
                                    <span>Tool Name</span><strong>{formData.toolName}</strong>
                                </div>
                                <div className={styles.reviewItem}>
                                    <span>Website</span><strong>{formData.toolUrl}</strong>
                                </div>
                                <div className={styles.reviewItem}>
                                    <span>Category</span><strong>{categories.find(c => c.id === formData.categoryId)?.name}</strong>
                                </div>
                                <div className={styles.reviewItem}>
                                    <span>Pricing</span><strong style={{ textTransform: 'capitalize' }}>{formData.pricing}</strong>
                                </div>
                                <div className={styles.reviewItem}>
                                    <span>Contact</span><strong>{formData.contactName}</strong>
                                </div>
                                <div className={styles.reviewItem}>
                                    <span>Email</span><strong>{formData.email}</strong>
                                </div>
                            </div>

                            <div className={styles.paymentBox}>
                                <div className={styles.paymentAmount}>
                                    <span>Submission Fee</span>
                                    <span className={styles.price}>₹499</span>
                                </div>
                                <p className={styles.paymentNote}>
                                    One-time fee • Reviewed within 48 hours • Money-back if rejected
                                </p>
                            </div>

                            <div className={styles.formActions}>
                                <button className="btn btn-secondary btn-lg" onClick={() => setStep(2)}>← Back</button>
                                <button className="btn btn-primary btn-lg" onClick={handleSubmit}>
                                    💳 Pay ₹499 & Submit
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
