'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { AIPrompt } from '@/lib/prompt-types';
import { prompts } from '@/data/prompt-data';
import PromptCard from './PromptCard';
import styles from './PromptSearch.module.css';

export default function PromptSearch() {
    const [query, setQuery] = useState('');
    const [isActive, setIsActive] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Filter prompts globally
    const results = useMemo(() => {
        if (!query.trim()) return [];
        const term = query.toLowerCase();
        return prompts.filter(p =>
            p.title.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.tags.some(t => t.toLowerCase().includes(term))
        ).slice(0, 8); // Limit to top 8 results for the dropdown
    }, [query]);

    // Handle clicks outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsActive(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.searchContainer} ref={searchRef}>
            <div className={`${styles.searchBar} ${isActive ? styles.searchBarActive : ''}`}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                    type="text"
                    placeholder="Search 50+ AI prompts (e.g. 'marketing', 'email', 'GST')..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsActive(true);
                    }}
                    onFocus={() => setIsActive(true)}
                    className={styles.searchInput}
                />
                {query && (
                    <button className={styles.clearBtn} onClick={() => setQuery('')}>
                        ✕
                    </button>
                )}
            </div>

            {isActive && query.trim() && (
                <div className={styles.resultsDropdown}>
                    {results.length > 0 ? (
                        <>
                            <div className={styles.resultsList}>
                                {results.map(prompt => (
                                    <div key={prompt.id} className={styles.resultItem}>
                                        <div className={styles.resultInfo}>
                                            <h4 className={styles.resultTitle}>{prompt.title}</h4>
                                            <p className={styles.resultDesc}>{prompt.description.substring(0, 60)}...</p>
                                        </div>
                                        <button
                                            className={styles.viewResultBtn}
                                            onClick={() => {
                                                // We can't easily scroll to it if it's in another page, 
                                                // so for now let's just copy the prompt directly or link to category
                                                // Ideally, we'd have a single prompt page or deep link
                                                const categorySlug = prompt.category;
                                                window.location.href = `/ai-prompts/${categorySlug}#${prompt.id}`;
                                            }}
                                        >
                                            View →
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.resultsFooter}>
                                <span>Found {results.length} matches</span>
                                <button
                                    className={styles.seeAllBtn}
                                    onClick={() => {
                                        // Potential improvement: Search results page
                                    }}
                                >
                                    Press Enter to see all
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className={styles.noResults}>
                            <span>😕</span>
                            <p>No prompts found for &quot;{query}&quot;</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
