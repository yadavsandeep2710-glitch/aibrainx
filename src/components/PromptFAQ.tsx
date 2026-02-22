'use client';

import { useState } from 'react';
import styles from './PromptFAQ.module.css';

interface FAQ {
    question: string;
    answer: string;
}

interface PromptFAQProps {
    faqs: FAQ[];
    categoryName: string;
}

export default function PromptFAQ({ faqs, categoryName }: PromptFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // JSON-LD FAQ Schema
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <section className={styles.faqSection}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <h2 className={styles.faqTitle}>
                Frequently Asked Questions about {categoryName}
            </h2>
            <div className={styles.faqList}>
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`${styles.faqItem} ${openIndex === index ? styles.faqItemOpen : ''}`}
                    >
                        <button
                            className={styles.faqQuestion}
                            onClick={() => toggle(index)}
                            aria-expanded={openIndex === index}
                        >
                            <span>{faq.question}</span>
                            <span className={styles.faqToggle}>
                                {openIndex === index ? '−' : '+'}
                            </span>
                        </button>
                        {openIndex === index && (
                            <div className={styles.faqAnswer}>
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
