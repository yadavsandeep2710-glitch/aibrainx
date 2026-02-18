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
        return unindent(content)
            .replace(/JSON\s*[-_]*\s*```json\s*\{[\s\S]*?"@context":\s*"https:\/\/schema\.org"[\s\S]*?\}\s*```/gi, '')
            .replace(/```json\s*\{[\s\S]*?"@context":\s*"https:\/\/schema\.org"[\s\S]*?\}\s*```/gi, '');
    };

    const sanitizedContent = cleanContent(post.content);

    return (
        <div className={styles.page}>
            <BlogScrollProgress />

            <div className={styles.container}>
                {/* Breadcrumb */}
                <nav className={styles.breadcrumb}>
                    <Link href="/blog">Blog</Link>
                    <span>/</span>
                    <span className={styles.breadcrumbCurrent}>{post.category}</span>
                </nav>

                {/* Editorial Header */}
                <header className={styles.articleHeader}>
                    <span className={styles.category}>{post.category}</span>
                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.excerpt}>{post.excerpt}</p>

                    <div className={styles.meta}>
                        <div className={styles.author}>
                            <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=18181b&color=fff&rounded=true`}
                                alt={post.author}
                            />
                            <span>{post.author}</span>
                        </div>
                        <span className={styles.separator}></span>
                        <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Draft'}</span>
                        <span className={styles.separator}></span>
                        <span>{post.read_time} min read</span>
                    </div>
                </header>

                {/* Cinematic Cover Image */}
                {post.cover_image_url && (
                    <div className={styles.coverImage}>
                        <img src={post.cover_image_url} alt={post.title} />
                    </div>
                )}

                {/* Main Content - Centered */}
                <div className={styles.contentWrapper}>
                    <article className={styles.article}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                // Custom link handling to open external in new tab?
                                a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />
                            }}
                        >
                            {sanitizedContent}
                        </ReactMarkdown>
                    </article>

                    {/* Article Footer: Tags & Share */}
                    <div className={styles.articleFooter}>
                        {post.tags && post.tags.length > 0 && (
                            <div className={styles.tags}>
                                {post.tags.map(tag => (
                                    <Link key={tag} href={`/blog?category=${encodeURIComponent(tag)}`} className={styles.tag}>
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        )}

                        <div className={styles.shareSection}>
                            <span className={styles.shareLabel}>Share this article</span>
                            <div className={styles.shareButtons}>
                                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://aibrainx.in/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn} aria-label="Share on Twitter">
                                    𝕏
                                </a>
                                <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' https://aibrainx.in/blog/' + post.slug)}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn} aria-label="Share on WhatsApp">
                                    💬
                                </a>
                                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://aibrainx.in/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn} aria-label="Share on LinkedIn">
                                    💼
                                </a>
                            </div>
                        </div>

                        {/* Embedded Newsletter */}
                        <div className={styles.newsletter}>
                            <h3>Subscribe to AI BrainX</h3>
                            <p>Get the latest AI tools and guides delivered straight to your inbox. No spam, just value.</p>
                            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                                <input type="email" placeholder="Your email address" required />
                                <button type="submit">Subscribe Free</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Posts Section - Full Width Background */}
            {relatedPosts.length > 0 && (
                <section className={styles.relatedSection}>
                    <div className={styles.relatedContainer}>
                        <h2 className={styles.relatedTitle}>Read Next</h2>
                        <div className={styles.relatedGrid}>
                            {relatedPosts.map(rp => (
                                <Link key={rp.id} href={`/blog/${rp.slug}`} className={styles.relatedCard}>
                                    <div className={styles.relatedImageWrapper}>
                                        <img src={rp.cover_image_url} alt={rp.title} className={styles.relatedImage} loading="lazy" />
                                    </div>
                                    <span style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>{rp.category}</span>
                                    <h3 style={{ marginTop: '0.5rem' }}>{rp.title}</h3>
                                    <div className={styles.relatedMeta}>
                                        <span>{rp.read_time} min read</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}


