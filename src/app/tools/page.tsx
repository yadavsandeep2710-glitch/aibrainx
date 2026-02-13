'use client';

import { useState, useMemo } from 'react';
import ToolCard from '@/components/ToolCard';
import { tools, categories } from '@/lib/data';
import styles from './page.module.css';

export default function ToolsPage() {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [pricing, setPricing] = useState('all');
    const [sort, setSort] = useState('popular');

    const filteredTools = useMemo(() => {
        let result = tools.filter(t => t.status === 'approved');

        if (search) {
            const q = search.toLowerCase();
            result = result.filter(t =>
                t.name.toLowerCase().includes(q) ||
                t.tagline.toLowerCase().includes(q) ||
                t.tags.some(tag => tag.includes(q))
            );
        }

        if (selectedCategory !== 'all') {
            const cat = categories.find(c => c.slug === selectedCategory);
            if (cat) result = result.filter(t => t.category_id === cat.id);
        }

        if (pricing !== 'all') {
            result = result.filter(t => t.pricing === pricing);
        }

        switch (sort) {
            case 'popular': result.sort((a, b) => b.review_count - a.review_count); break;
            case 'rating': result.sort((a, b) => b.rating - a.rating); break;
            case 'newest': result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); break;
            case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
        }

        return result;
    }, [search, selectedCategory, pricing, sort]);

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Page Header */}
                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>AI Tools Directory</h1>
                    <p className={styles.pageSubtitle}>
                        Discover {tools.length}+ curated AI tools with pricing in ₹ and Indian user reviews
                    </p>
                </div>

                {/* Search & Filters */}
                <div className={styles.filters}>
                    <div className={styles.searchWrap}>
                        <span className={styles.searchIcon}>🔍</span>
                        <input
                            type="text"
                            placeholder="Search AI tools..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.filterRow}>
                        <div className={styles.filterGroup}>
                            <label className={styles.filterLabel}>Category</label>
                            <select
                                value={selectedCategory}
                                onChange={e => setSelectedCategory(e.target.value)}
                                className={styles.filterSelect}
                            >
                                <option value="all">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.slug}>{cat.icon} {cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.filterGroup}>
                            <label className={styles.filterLabel}>Pricing</label>
                            <select
                                value={pricing}
                                onChange={e => setPricing(e.target.value)}
                                className={styles.filterSelect}
                            >
                                <option value="all">All Pricing</option>
                                <option value="free">Free</option>
                                <option value="freemium">Freemium</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>

                        <div className={styles.filterGroup}>
                            <label className={styles.filterLabel}>Sort by</label>
                            <select
                                value={sort}
                                onChange={e => setSort(e.target.value)}
                                className={styles.filterSelect}
                            >
                                <option value="popular">Most Popular</option>
                                <option value="rating">Highest Rated</option>
                                <option value="newest">Newest</option>
                                <option value="name">Name A-Z</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Category Pills */}
                <div className={styles.categoryPills}>
                    <button
                        className={`${styles.pill} ${selectedCategory === 'all' ? styles.pillActive : ''}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`${styles.pill} ${selectedCategory === cat.slug ? styles.pillActive : ''}`}
                            onClick={() => setSelectedCategory(cat.slug)}
                        >
                            {cat.icon} {cat.name}
                        </button>
                    ))}
                </div>

                {/* Results */}
                <div className={styles.resultsHeader}>
                    <span className={styles.resultCount}>{filteredTools.length} tools found</span>
                </div>

                {filteredTools.length > 0 ? (
                    <div className={styles.toolsGrid}>
                        {filteredTools.map(tool => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.noResults}>
                        <span className={styles.noResultsIcon}>🔍</span>
                        <h3>No tools found</h3>
                        <p>Try adjusting your search or filters</p>
                    </div>
                )}

                {/* Ad Slot */}
                <div className="ad-slot" style={{ marginTop: '3rem' }}>
                    Advertisement Space
                </div>
            </div>
        </div>
    );
}
