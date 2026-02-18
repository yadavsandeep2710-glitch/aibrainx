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
                {/* Breadcrumb - Full Width */}
                <nav className={styles.breadcrumb}>
                    <Link href="/">Home</Link>
                    <span>&rsaquo;</span>
                    <Link href="/blog">Blog</Link>
                    <span>&rsaquo;</span>
                    <span className={styles.breadcrumbCurrent}>{post.category}</span>
                </nav>

                {/* Left Column: Header + Content */}
                <div style={{ display: 'contents' }}>
                    <main style={{ gridColumn: '1 / 2' }}>
                        <header className={styles.articleHeader}>
                            <span className={styles.category}>{post.category}</span>
                            <h1 className={styles.title}>{post.title}</h1>
                            <p className={styles.excerpt}>{post.excerpt}</p>

                            <div className={styles.meta}>
                                <div className={styles.author}>
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=000&color=fff&rounded=true`}
                                        alt={post.author}
                                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                    />
                                    <div>
                                        <span>{post.author}</span>
                                        <div style={{ fontSize: '11px', fontWeight: 400, color: '#888', marginTop: '2px' }}>AUTHOR</div>
                                    </div>
                                </div>
                                <span className={styles.separator}>|</span>
                                <div>
                                    <div style={{ fontSize: '11px', color: '#888' }}>CREATED</div>
                                    <span>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Draft'}</span>
                                </div>
                                <span className={styles.separator}>|</span>
                                <span>{post.read_time} min read</span>
                            </div>
                        </header>

                        {post.cover_image_url && (
                            <div className={styles.coverImage}>
                                <img src={post.cover_image_url} alt={post.title} />
                            </div>
                        )}

                        <div className={styles.contentWrapper}>
                            <div className={styles.shareSection}>
                                <span style={{ marginRight: '15px', fontWeight: 700, fontSize: '14px' }}>SHARE</span>
                                <div className={styles.shareButtons} style={{ display: 'inline-flex', verticalAlign: 'middle' }}>
                                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn}>𝕏</a>
                                    <a href={`https://wa.me/?text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn}>💬</a>
                                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://aibrainx.in/blog/' + post.slug)}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn}>💼</a>
                                </div>
                            </div>

                            <article className={styles.article}>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        // Custom link handling to open external in new tab?
                                        a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" style={{ color: '#e21b22', fontWeight: 700 }} />
                                    }}
                                >
                                    {sanitizedContent}
                                </ReactMarkdown>
                            </article>
                        </div>
                    </main>

                    {/* Right Column: Sidebar */}
                    <aside className={styles.sidebar}>
                        <div className={styles.stickySidebar}>
                            <div className={styles.sidebarCard}>
                                <h3>Trending in {post.category}</h3>
                                {relatedPosts.slice(0, 3).map(rp => (
                                    <div key={rp.id} style={{ marginBottom: '15px' }}>
                                        <Link href={`/blog/${rp.slug}`} style={{ textDecoration: 'none', color: '#333' }}>
                                            <h4 style={{ fontSize: '14px', fontWeight: 700, margin: 0, fontFamily: 'Arial, sans-serif' }}>{rp.title}</h4>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {/* Author Bio Widget */}
                            <div className={styles.sidebarCard}>
                                <h3>About the Author</h3>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=000&color=fff&rounded=true`}
                                        style={{ width: '50px', height: '50px', borderRadius: '50%', flexShrink: 0 }}
                                        alt={post.author}
                                    />
                                    <div>
                                        <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.5', color: '#555' }}>
                                            {post.author} consists of a team of tech enthusiasts and AI experts dedicated to bringing you the latest in artificial intelligence updates.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Tags Widget */}
                            {post.tags && post.tags.length > 0 && (
                                <div className={styles.sidebarCard}>
                                    <h3>TOPICS</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {post.tags.map(tag => (
                                            <Link key={tag} href={`/blog?category=${encodeURIComponent(tag)}`} style={{
                                                fontSize: '11px',
                                                textTransform: 'uppercase',
                                                color: '#333',
                                                border: '1px solid #ddd',
                                                padding: '5px 10px',
                                                borderRadius: '20px',
                                                textDecoration: 'none',
                                                fontFamily: 'Arial, sans-serif'
                                            }}>
                                                {tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>

            {/* Related Posts Bottom Section */}
            {relatedPosts.length > 0 && (
                <section className={styles.relatedSection} style={{ maxWidth: '1200px', margin: '50px auto 0', padding: '20px' }}>
                    <h2 className={styles.relatedTitle}>MORE FROM THIS SECTION</h2>
                    <div className={styles.relatedGrid}>
                        {relatedPosts.map(rp => (
                            <Link key={rp.id} href={`/blog/${rp.slug}`} className={styles.relatedCard}>
                                <div className={styles.relatedImageWrapper}>
                                    <img src={rp.cover_image_url} alt={rp.title} className={styles.relatedImage} loading="lazy" />
                                </div>
                                <h3>{rp.title}</h3>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
