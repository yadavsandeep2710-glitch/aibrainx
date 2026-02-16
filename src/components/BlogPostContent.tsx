'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import type { BlogPost } from '@/lib/types';
import styles from '@/app/blog/[slug]/page.module.css';

import BlogScrollProgress from '@/components/BlogScrollProgress';

interface BlogPostContentProps {
    post: BlogPost;
    relatedPosts: BlogPost[];
}

/**
 * Strips leading indentation from strings, useful for template literals
 */
const unindent = (str: string) => {
    if (!str) return '';
    const lines = str.split('\n');
    const minIndent = lines.reduce((min, line) => {
        if (line.trim().length === 0) return min;
        const indent = line.match(/^\s*/)?.[0].length ?? 0;
        return Math.min(min, indent);
    }, Infinity);

    const finalMinIndent = minIndent === Infinity ? 0 : minIndent;
    return lines.map(line => line.slice(finalMinIndent)).join('\n').trim();
};

export default function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
    // Clean content to remove accidental JSON schema blocks that might have been injected into the text
    const cleanContent = (content: string) => {
        if (!content) return '';
        // Remove "JSON" heading and code block pattern often left by AI generators
        return unindent(content)
            .replace(/JSON\s*[-_]*\s*```json\s*\{[\s\S]*?"@context":\s*"https:\/\/schema\.org"[\s\S]*?\}\s*```/gi, '')
            .replace(/```json\s*\{[\s\S]*?"@context":\s*"https:\/\/schema\.org"[\s\S]*?\}\s*```/gi, '');
    };

    const sanitizedContent = cleanContent(post.content);

    return (
        <div className={styles.page}>
            <BlogScrollProgress />
            <div className={styles.container}>
                <nav className={styles.breadcrumb}>
                    <Link href="/">Home</Link>
                    <span>/</span>
                    <Link href="/blog">Blog</Link>
                    <span>/</span>
                    <span className={styles.breadcrumbCurrent}>{post.category}</span>
                </nav>

                <header className={styles.articleHeader}>
                    <span className={styles.category}>{post.category}</span>
                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.excerpt}>{post.excerpt}</p>
                    <div className={styles.meta}>
                        <div className={styles.author}>
                            <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=3b82f6&color=fff&rounded=true`}
                                alt={post.author}
                                style={{ width: 32, height: 32 }}
                            />
                            <span>{post.author}</span>
                        </div>
                        <span className={styles.separator}></span>
                        <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Draft'}</span>
                        <span className={styles.separator}></span>
                        <span>{post.read_time} min read</span>
                    </div>
                </header>

                {post.cover_image_url && (
                    <div className={styles.coverImage}>
                        <img src={post.cover_image_url} alt={post.title} loading="lazy" />
                    </div>
                )}

                <div className={styles.contentWrapper}>
                    <div style={{ minWidth: 0 }}>
                        <article className={styles.article}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {sanitizedContent}
                            </ReactMarkdown>
                        </article>

                        {/* Article Newsletter Section */}
                        <div className={styles.articleNewsletter}>
                            <div className={styles.newsletterContent}>
                                <h3>Like this deep dive?</h3>
                                <p>Join 5,000+ AI enthusiasts getting weekly insights that move the needle. No fluff, just value.</p>
                                <form className={styles.newsletterForm}>
                                    <input type="email" placeholder="Enter your email" required />
                                    <button type="submit">Subscribe</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <aside className={styles.sidebar}>
                        <div className={styles.stickySidebar}>
                            <div className={styles.sidebarCard}>
                                <h3>Spread the knowledge</h3>
                                <div className={styles.shareButtons}>
                                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://aibrainx.in/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn}>
                                        <span style={{ fontSize: '1.2rem' }}>𝕏</span> Twitter
                                    </a>
                                    <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' https://aibrainx.in/blog/' + post.slug)}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn}>
                                        <span style={{ fontSize: '1.2rem' }}>💬</span> WhatsApp
                                    </a>
                                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://aibrainx.in/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn}>
                                        <span style={{ fontSize: '1.2rem' }}>💼</span> LinkedIn
                                    </a>
                                </div>
                            </div>

                            {post.tags && post.tags.length > 0 && (
                                <div className={styles.sidebarCard}>
                                    <h3>Expertise Areas</h3>
                                    <div className={styles.tags}>
                                        {post.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
                                    </div>
                                </div>
                            )}

                            <div className="ad-slot">
                                <p style={{ fontSize: '10px', opacity: 0.5, letterSpacing: '1px' }}>SPONSORED CONTENT</p>
                            </div>
                        </div>
                    </aside>
                </div>

                {relatedPosts.length > 0 && (
                    <section className={styles.relatedSection}>
                        <h2 className={styles.relatedTitle}>Continue Reading</h2>
                        <div className={styles.relatedGrid}>
                            {relatedPosts.map(rp => (
                                <Link key={rp.id} href={`/blog/${rp.slug}`} className={styles.relatedCard}>
                                    <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9' }}>
                                        <img src={rp.cover_image_url} alt={rp.title} className={styles.relatedImage} loading="lazy" />
                                    </div>
                                    <div className={styles.relatedContent}>
                                        <span className={styles.relatedMeta} style={{ color: 'var(--accent-primary)', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '1px' }}>
                                            {rp.category}
                                        </span>
                                        <h3>{rp.title}</h3>
                                        <div className={styles.relatedMeta}>
                                            <span>{rp.read_time} min read</span>
                                        </div>
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


