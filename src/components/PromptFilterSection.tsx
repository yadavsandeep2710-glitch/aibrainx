'use client';

import { useState, useMemo } from 'react';
import { AIPrompt } from '@/lib/prompt-types';
import PromptCard from './PromptCard';
import styles from './PromptFilterSection.module.css';

interface PromptFilterSectionProps {
    prompts: AIPrompt[];
    categorySlug: string;
    subCategories?: string[];
}

export default function PromptFilterSection({ prompts, categorySlug, subCategories }: PromptFilterSectionProps) {
    const [search, setSearch] = useState('');
    const [activeTag, setActiveTag] = useState<string | null>(null);

    // Derive unique tags from all prompts in this category
    const allTags = useMemo(() => {
        const tagSet = new Set<string>();
        prompts.forEach(p => p.tags.forEach(t => tagSet.add(t)));
        return Array.from(tagSet).sort();
    }, [prompts]);

    // Filter prompts by search + active tag
    const filteredPrompts = useMemo(() => {
        return prompts.filter(p => {
            const matchesSearch = !search ||
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase()) ||
                p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
            const matchesTag = !activeTag ||
                p.tags.some(t => t.toLowerCase() === activeTag.toLowerCase());
            return matchesSearch && matchesTag;
        });
    }, [prompts, search, activeTag]);

    const isFiltered = !!search || !!activeTag;

    // If using sub-categories (Indian Business mode) and no filter active, group by sub-category
    if (subCategories && !isFiltered) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.filterBar}>
                    <div className={styles.searchWrap}>
                        <span className={styles.searchIcon}>🔍</span>
                        <input
                            type="text"
                            placeholder="Search prompts by keyword or tag..."
                            className={styles.searchInput}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        {search && (
                            <button className={styles.clearBtn} onClick={() => setSearch('')}>✕</button>
                        )}
                    </div>
                    <div className={styles.tagRow}>
                        <button
                            className={`${styles.tagPill} ${!activeTag ? styles.tagPillActive : ''}`}
                            onClick={() => setActiveTag(null)}
                        >
                            All
                        </button>
                        {allTags.slice(0, 12).map(tag => (
                            <button
                                key={tag}
                                className={`${styles.tagPill} ${activeTag === tag ? styles.tagPillActive : ''}`}
                                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {subCategories.map(subCat => {
                    const filtered = prompts.filter(p =>
                        p.tags.some(tag => tag.toLowerCase().includes(subCat.toLowerCase()))
                    );
                    if (filtered.length === 0) return null;
                    return (
                        <div key={subCat} className={styles.subCategoryBlock}>
                            <h3 className={styles.subCategoryHeader}>{subCat} Prompts</h3>
                            <div className={styles.promptsGrid}>
                                {filtered.map(prompt => (
                                    <PromptCard
                                        key={prompt.id}
                                        prompt={prompt}
                                        onTagClick={setActiveTag}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.filterBar}>
                <div className={styles.searchWrap}>
                    <span className={styles.searchIcon}>🔍</span>
                    <input
                        type="text"
                        placeholder="Search prompts by keyword or tag..."
                        className={styles.searchInput}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search && (
                        <button className={styles.clearBtn} onClick={() => setSearch('')}>✕</button>
                    )}
                </div>
                <div className={styles.tagRow}>
                    <button
                        className={`${styles.tagPill} ${!activeTag ? styles.tagPillActive : ''}`}
                        onClick={() => setActiveTag(null)}
                    >
                        All
                    </button>
                    {allTags.slice(0, 12).map(tag => (
                        <button
                            key={tag}
                            className={`${styles.tagPill} ${activeTag === tag ? styles.tagPillActive : ''}`}
                            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {filteredPrompts.length === 0 ? (
                <div className={styles.emptyState}>
                    <span>😕</span>
                    <p>No prompts found matching <strong>&quot;{search || activeTag}&quot;</strong>. Try a different keyword.</p>
                    <button className={styles.resetBtn} onClick={() => { setSearch(''); setActiveTag(null); }}>
                        Reset Filters
                    </button>
                </div>
            ) : (
                <>
                    {isFiltered && (
                        <p className={styles.resultCount}>{filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''} found</p>
                    )}
                    <div className={styles.promptsGrid}>
                        {filteredPrompts.map(prompt => (
                            <PromptCard
                                key={prompt.id}
                                prompt={prompt}
                                onTagClick={setActiveTag}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
