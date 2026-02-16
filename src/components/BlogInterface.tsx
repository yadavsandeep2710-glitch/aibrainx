'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import BlogCard from '@/components/BlogCard';
import styles from './BlogInterface.module.css';

interface BlogInterfaceProps {
    initialPosts: BlogPost[];
}

export default function BlogInterface({ initialPosts }: BlogInterfaceProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Extract categories efficiently
    const categories = useMemo(() => {
        const cats = new Set(initialPosts.map(p => p.category).filter(Boolean));
        return ['All', ...Array.from(cats)].sort();
    }, [initialPosts]);

    // Filter posts
    const filteredPosts = useMemo(() => {
        return initialPosts.filter(post => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [initialPosts, searchQuery, selectedCategory]);

    // Derived lists
    const featuredPost = filteredPosts.length > 0 && selectedCategory === 'All' && !searchQuery ? filteredPosts[0] : null;
    const listPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;
    const trendingPosts = initialPosts.slice(0, 3); // Mock trending logic (first 3)

    return (
        <div className={styles.container}>
            {/* Controls: Search & Category Filter */}
            <div className={styles.controls}>
                <div className={styles.categoryScroll}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`${styles.categoryPill} ${selectedCategory === cat ? styles.active : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className={styles.searchWrapper}>
                    <span className={styles.searchIcon}>🔍</span>
                    <input
                        type="text"
                        placeholder="Search for guides, tools..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Featured Post (Hero) - Only show on default view */}
            {featuredPost && (
                <section className={styles.heroSection}>
                    <Link href={`/blog/${featuredPost.slug}`} className={styles.heroCard}>
                        <div className={styles.heroImageWrapper}>
                            <img
                                src={featuredPost.cover_image_url}
                                alt={featuredPost.title}
                                className={styles.heroImage}
                            />
                            <div className={styles.heroOverlay}></div>
                        </div>
                        <div className={styles.heroContent}>
                            <span className={styles.heroBadge}>{featuredPost.category}</span>
                            <div className={styles.heroMeta}>
                                <span>{new Date(featuredPost.published_at || featuredPost.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                <span>•</span>
                                <span>{featuredPost.read_time} min read</span>
                            </div>
                            <h2 className={styles.heroTitle}>{featuredPost.title}</h2>
                            <p className={styles.heroExcerpt}>{featuredPost.excerpt}</p>

                            <div className={styles.readButton}>
                                Read Article <span>→</span>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            <div className={styles.mainLayout}>
                {/* Left Column: Post Grid */}
                <div className={styles.contentColumn}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                            Latest Articles
                            {searchQuery && <span className={styles.resultCount}>{filteredPosts.length} matches</span>}
                        </h2>
                    </div>

                    {listPosts.length > 0 ? (
                        <div className={styles.postsGrid}>
                            {listPosts.map(post => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noResults}>
                            <h3>No articles found</h3>
                            <p>Try adjusting your search or category filter</p>
                            <button
                                className="btn btn-secondary"
                                style={{ marginTop: '1rem' }}
                                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Column: Sticky Sidebar */}
                <aside className={styles.sidebar}>
                    {/* Newsletter Widget */}
                    <div className={styles.sidebarWidget}>
                        <h3 className={styles.widgetTitle}>⚡ AI Insights Weekly</h3>
                        <p className={styles.newsletterText}>
                            Join 10,000+ Indian founders & students getting simplified AI tools & news.
                        </p>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Email address"
                                className={styles.newsletterInput}
                                required
                            />
                            <button type="submit" className={styles.newsletterBtn}>Subscribe Free</button>
                        </form>
                        <div className={styles.trustBadge}>
                            <span>🔒 No spam. Unsubscribe anytime.</span>
                        </div>
                    </div>

                    {/* Trending Articles */}
                    <div className={styles.sidebarWidget}>
                        <h3 className={styles.widgetTitle}>🔥 Trending Now</h3>
                        <div className={styles.trendingList}>
                            {trendingPosts.map((post, index) => (
                                <div key={post.id} className={styles.trendingItem}>
                                    <span className={styles.trendingIndex}>0{index + 1}</span>
                                    <div className={styles.trendingContent}>
                                        <Link href={`/blog/${post.slug}`} className={styles.trendingLink}>
                                            {post.title}
                                        </Link>
                                        <div className={styles.trendingMeta}>
                                            {post.read_time} min read • {post.category}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trust Signals */}
                    <div className={styles.sidebarWidget} style={{ background: 'transparent', border: 'none', padding: 0 }}>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <span className="tag">🇮🇳 Made for India</span>
                            <span className="tag">🎓 Student Friendly</span>
                            <span className="tag">💼 Business Ready</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
