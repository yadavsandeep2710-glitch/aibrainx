'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getAllBlogPosts, getPublishedBlogPosts } from '@/lib/store';
import type { BlogPost } from '@/lib/types';
import styles from './page.module.css';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function BlogArticlePage({ params }: PageProps) {
    const { slug } = use(params);
    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const allPosts = getAllBlogPosts();
        const found = allPosts.find(p => p.slug === slug) || null;
        setPost(found);
        if (found) {
            setRelatedPosts(getPublishedBlogPosts().filter(p => p.id !== found.id).slice(0, 3));
        }
        setLoading(false);
    }, [slug]);

    if (loading) {
        return (
            <div className={styles.page}>
                <div className={styles.container}>
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                        <div className="skeleton" style={{ width: '60%', height: '2rem', margin: '0 auto 1rem' }} />
                        <div className="skeleton" style={{ width: '40%', height: '1rem', margin: '0 auto' }} />
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className={styles.page}>
                <div className={styles.container}>
                    <div style={{ textAlign: 'center', padding: '6rem 0' }}>
                        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Post not found</p>
                        <Link href="/blog" className="btn btn-primary">← Back to Blog</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org', '@type': 'Article',
                    headline: post.title, description: post.excerpt,
                    image: post.cover_image_url, datePublished: post.published_at,
                    author: { '@type': 'Organization', name: post.author },
                    publisher: { '@type': 'Organization', name: 'AIBrainX.in' },
                })
            }} />

            <div className={styles.page}>
                <div className={styles.container}>
                    <nav className={styles.breadcrumb}>
                        <Link href="/">Home</Link><span>/</span>
                        <Link href="/blog">Blog</Link><span>/</span>
                        <span className={styles.breadcrumbCurrent}>{post.title}</span>
                    </nav>

                    <header className={styles.articleHeader}>
                        <span className={styles.category}>{post.category}</span>
                        <h1 className={styles.title}>{post.title}</h1>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                        <div className={styles.meta}>
                            <span className={styles.author}>By {post.author}</span>
                            <span>·</span>
                            <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Draft'}</span>
                            <span>·</span>
                            <span>{post.read_time} min read</span>
                        </div>
                    </header>

                    <div className={styles.coverImage}>
                        <img src={post.cover_image_url} alt={post.title} loading="lazy" />
                    </div>

                    <div className={styles.contentWrapper}>
                        <article className={`prose ${styles.article}`}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {post.content}
                            </ReactMarkdown>
                        </article>

                        <aside className={styles.sidebar}>
                            <div className={styles.sidebarCard}>
                                <h3>📌 Share this article</h3>
                                <div className={styles.shareButtons}>
                                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://aibrainx.in/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn}>𝕏 Tweet</a>
                                    <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' https://aibrainx.in/blog/' + post.slug)}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn}>💬 WhatsApp</a>
                                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://aibrainx.in/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn}>💼 LinkedIn</a>
                                </div>
                            </div>

                            <div className={styles.sidebarCard}>
                                <h3>🏷️ Tags</h3>
                                <div className={styles.tags}>
                                    {post.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
                                </div>
                            </div>

                            <div className="ad-slot">Ad Space</div>
                        </aside>
                    </div>

                    {relatedPosts.length > 0 && (
                        <section className={styles.relatedSection}>
                            <h2 className={styles.relatedTitle}>You might also like</h2>
                            <div className={styles.relatedGrid}>
                                {relatedPosts.map(rp => (
                                    <Link key={rp.id} href={`/blog/${rp.slug}`} className={styles.relatedCard}>
                                        <img src={rp.cover_image_url} alt={rp.title} className={styles.relatedImage} loading="lazy" />
                                        <div className={styles.relatedContent}>
                                            <h3>{rp.title}</h3>
                                            <span className={styles.relatedMeta}>{rp.read_time} min read</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}
