'use client';

import { useState, useEffect } from 'react';
import BlogCard from '@/components/BlogCard';
import { getPublishedBlogPosts } from '@/lib/store';
import type { BlogPost } from '@/lib/types';
import styles from './page.module.css';

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        setPosts(getPublishedBlogPosts());
    }, []);

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>AI Blog</h1>
                    <p className={styles.pageSubtitle}>
                        Daily insights, comparisons, and tutorials on AI tools — written for Indian users 🇮🇳
                    </p>
                </div>

                {/* Featured Post */}
                {posts[0] && (
                    <a href={`/blog/${posts[0].slug}`} className={styles.featuredPost}>
                        <div className={styles.featuredImage}>
                            <img src={posts[0].cover_image_url} alt={posts[0].title} loading="lazy" />
                        </div>
                        <div className={styles.featuredContent}>
                            <span className={styles.featuredBadge}>Latest</span>
                            <h2 className={styles.featuredTitle}>{posts[0].title}</h2>
                            <p className={styles.featuredExcerpt}>{posts[0].excerpt}</p>
                            <div className={styles.featuredMeta}>
                                <span>{new Date(posts[0].published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                <span>·</span>
                                <span>{posts[0].read_time} min read</span>
                            </div>
                        </div>
                    </a>
                )}

                {/* Posts Grid */}
                <div className={styles.postsGrid}>
                    {posts.slice(1).map(post => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                {posts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                        <p style={{ fontSize: '3rem' }}>📝</p>
                        <h3>No posts yet</h3>
                        <p>Check back soon for fresh AI insights!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
