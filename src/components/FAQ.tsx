'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles.faq}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`${styles.item} ${openIndex === index ? styles.open : ''}`}
                >
                    <button
                        className={styles.question}
                        onClick={() => toggleItem(index)}
                        aria-expanded={openIndex === index}
                    >
                        <span>{item.question}</span>
                        <span className={styles.icon}>
                            {openIndex === index ? '−' : '+'}
                        </span>
                    </button>
                    <div className={styles.answerWrap}>
                        <div className={styles.answer}>
                            <div className={styles.answerContent}>
                                {item.answer}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
