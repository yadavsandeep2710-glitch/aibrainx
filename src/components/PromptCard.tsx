'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AIPrompt } from '@/lib/prompt-types';
import styles from './PromptCard.module.css';

interface PromptCardProps {
    prompt: AIPrompt;
    onTagClick?: (tag: string) => void;
}

// Helper to render description with basic [text](/path) markdown links
const renderDescription = (text: string) => {
    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, i) => {
        const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
            return (
                <Link key={i} href={match[2]} className={styles.descriptionLink}>
                    {match[1]}
                </Link>
            );
        }
        return part;
    });
};

export default function PromptCard({ prompt, onTagClick }: PromptCardProps) {
    const [copied, setCopied] = useState(false);
    const [showExample, setShowExample] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(prompt.prompt_text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = prompt.prompt_text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <article className={styles.card} id={prompt.id}>
            <div className={styles.cardHeader}>
                <h3 className={styles.title}>{prompt.title}</h3>
                <div className={styles.description}>
                    {renderDescription(prompt.description)}
                </div>
            </div>

            <div className={styles.promptBlock}>
                <div className={styles.promptLabel}>
                    <span className={styles.promptIcon}>💡</span>
                    <span>Prompt</span>
                </div>
                <pre className={styles.promptText}>{prompt.prompt_text}</pre>
            </div>

            <div className={styles.cardActions}>
                <button
                    className={`${styles.copyBtn} ${copied ? styles.copyBtnCopied : ''}`}
                    onClick={handleCopy}
                    aria-label={copied ? 'Copied to clipboard' : 'Copy prompt to clipboard'}
                >
                    {copied ? (
                        <>
                            <span className={styles.copyIcon}>✓</span>
                            Copied!
                        </>
                    ) : (
                        <>
                            <span className={styles.copyIcon}>📋</span>
                            Copy Prompt
                        </>
                    )}
                </button>

                {prompt.example_output && (
                    <button
                        className={styles.exampleToggle}
                        onClick={() => setShowExample(!showExample)}
                    >
                        {showExample ? '▲ Hide Example' : '▼ Show Example Output'}
                    </button>
                )}
            </div>

            {showExample && prompt.example_output && (
                <div className={styles.exampleBlock}>
                    <div className={styles.exampleLabel}>
                        <span>✨</span>
                        <span>Example Output</span>
                    </div>
                    <pre className={styles.exampleText}>{prompt.example_output}</pre>
                </div>
            )}

            <div className={styles.tags}>
                {prompt.tags.map(tag => (
                    <button
                        key={tag}
                        className={styles.tag}
                        onClick={() => onTagClick?.(tag)}
                        title={`Filter by ${tag}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </article>
    );
}
