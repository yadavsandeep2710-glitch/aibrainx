'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import styles from '@/app/blog/[slug]/page.module.css';

interface BlogPostContentProps {
    post: BlogPost;
    relatedPosts: BlogPost[];
}

export default function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
    return (
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

                {post.cover_image_url && (
                    <div className={styles.coverImage}>
                        <img src={post.cover_image_url} alt={post.title} loading="lazy" />
                    </div>
                )}

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

                        {post.tags && post.tags.length > 0 && (
                            <div className={styles.sidebarCard}>
                                <h3>🏷️ Tags</h3>
                                <div className={styles.tags}>
                                    {post.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
                                </div>
                            </div>
                        )}

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
    );
}
