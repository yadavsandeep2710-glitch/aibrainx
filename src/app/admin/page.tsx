'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { createClient } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import RichTextEditor from '@/components/RichTextEditor';
import {
    getPosts,
    getAllTools, getToolSubmissions, updateSubmissionStatus,
    getContactMessages, generateId, categories,
} from '@/lib/store';
import { createPostAction, updatePostAction, deletePostAction } from '@/app/actions/blog';
import type { BlogPost, Tool } from '@/lib/types';
import type { ToolSubmission, ContactMessage } from '@/lib/store';
import styles from './page.module.css';

type Tab = 'overview' | 'tools' | 'blog' | 'submissions' | 'messages';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<Tab>('overview');
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [toolsList, setToolsList] = useState<Tool[]>([]);
    const [submissions, setSubmissions] = useState<ToolSubmission[]>([]);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isUploadingCover, setIsUploadingCover] = useState(false);
    const coverInputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();
    const router = useRouter();
    const { user, signOut } = useAuth();
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [showEditor, setShowEditor] = useState(false);
    const [saveMsg, setSaveMsg] = useState('');
    const [newPost, setNewPost] = useState({
        title: '', slug: '', excerpt: '', content: '', category: '', cover_image_url: '',
        tags: '', meta_title: '', meta_description: '',
    });
    const [loading, setLoading] = useState(false);

    // Load data on mount
    useEffect(() => {
        const load = async () => {
            const fetchedPosts = await getPosts();
            setPosts(fetchedPosts);
        };
        load();

        setToolsList(getAllTools());
        setSubmissions(getToolSubmissions());
        setMessages(getContactMessages());
    }, []);

    const refreshData = async () => {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
        setToolsList(getAllTools());
        setSubmissions(getToolSubmissions());
        setMessages(getContactMessages());
    };

    const sanitizeSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleSavePost = async (publish: boolean) => {
        const postData = {
            slug: sanitizeSlug(newPost.slug || newPost.title),
            title: newPost.title,
            excerpt: newPost.excerpt,
            content: newPost.content,
            cover_image_url: newPost.cover_image_url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
            author: 'AIBrainX Team',
            category: newPost.category || 'General',
            tags: newPost.tags ? newPost.tags.split(',').map(t => t.trim()) : [],
            published: publish,
            published_at: publish ? new Date().toISOString() : null,
            read_time: Math.max(1, Math.ceil(newPost.content.split(/\s+/).length / 200)),
            meta_title: newPost.meta_title || newPost.title + ' | AIBrainX',
            meta_description: newPost.meta_description || newPost.excerpt,
        };

        try {
            let result;
            if (editingPost) {
                result = await updatePostAction(editingPost.id, postData);
            } else {
                result = await createPostAction(postData);
            }

            if (!result.success) {
                alert(`Failed to save post: ${result.error}`);
                return;
            }

            setSaveMsg(publish ? '✅ Post published!' : '✅ Draft saved!');
            setTimeout(() => setSaveMsg(''), 3000);
            resetForm();
            refreshData();
        } catch (error: any) {
            console.error('Failed to save post:', error);
            alert(`Failed to save post: ${error.message || 'Unknown error'}`);
        }
    };

    const handleEditPost = (post: BlogPost) => {
        setEditingPost(post);
        setNewPost({
            title: post.title, slug: post.slug, excerpt: post.excerpt,
            content: post.content, category: post.category,
            cover_image_url: post.cover_image_url, tags: post.tags.join(', '),
            meta_title: post.meta_title || '', meta_description: post.meta_description || '',
        });
        setShowEditor(true);
        setActiveTab('blog');
    };

    const handleDeletePost = async (id: string) => {
        if (confirm('Are you sure you want to delete this post?')) {
            const result = await deletePostAction(id);
            if (!result.success) {
                alert(`Failed to delete post: ${result.error}`);
                return;
            }
            refreshData();
        }
    };

    const handleSubmissionAction = (id: string, status: 'approved' | 'rejected') => {
        updateSubmissionStatus(id, status);
        refreshData();
    };

    const resetForm = () => {
        setEditingPost(null);
        setShowEditor(false);
        setNewPost({ title: '', slug: '', excerpt: '', content: '', category: '', cover_image_url: '', tags: '', meta_title: '', meta_description: '' });
    };

    const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingCover(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `covers/${uuidv4()}.${fileExt}`;
            const { error } = await supabase.storage.from('blog-images').upload(fileName, file);
            if (error) throw error;
            const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(fileName);
            setNewPost(p => ({ ...p, cover_image_url: publicUrl }));
        } catch (error) {
            console.error('Error uploading cover:', error);
            alert('Failed to upload cover image.');
        } finally {
            setIsUploadingCover(false);
            if (coverInputRef.current) coverInputRef.current.value = '';
        }
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await fetch('/api/admin-logout', { method: 'POST' });
            // Also sign out from Supabase client side just in case
            await signOut();
            router.push('/admin/login');
            router.refresh();
        } catch (error) {
            console.error('Logout failed:', error);
            // Force redirect anyway
            router.push('/admin/login');
        } finally {
            setIsLoggingOut(false);
        }
    };

    const handleSeedContent = async () => {
        if (!confirm('Are you sure you want to seed default blog content? This may overwrite existing posts with the same slug.')) return;

        try {
            setLoading(true);
            const res = await fetch('/api/admin/seed-blog', { method: 'POST' });
            const data = await res.json();
            if (res.ok) {
                alert('Seed complete! Refreshing...');
                window.location.reload();
            } else {
                alert('Seed failed: ' + (data.error || 'Unknown error'));
            }
        } catch (err) {
            alert('Error seeding content');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const approvedTools = toolsList.filter(t => t.status === 'approved');
    const pendingSubs = submissions.filter(s => s.status === 'pending');
    const publishedPosts = posts.filter(p => p.published_at);

    const stats = [
        { label: 'Total Tools', value: approvedTools.length, icon: '🤖', color: 'var(--accent-primary)' },
        { label: 'Blog Posts', value: publishedPosts.length, icon: '📝', color: 'var(--green)' },
        { label: 'Pending', value: pendingSubs.length, icon: '⏳', color: 'var(--amber)' },
        { label: 'Messages', value: messages.length, icon: '📬', color: 'var(--purple)' },
    ];

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <div>
                            <h1 className={styles.title}>🔒 Admin Dashboard</h1>
                            {user && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Signed in as: {user.email}</p>}
                        </div>
                        <div className={styles.headerActions}>
                            <button className="btn btn-secondary btn-sm" onClick={handleSeedContent} disabled={loading}>
                                {loading ? 'Seeding...' : '🌱 Seed Content'}
                            </button>
                            <button className="btn btn-primary btn-sm" onClick={() => {
                                setEditingPost(null);
                                setNewPost({ title: '', slug: '', excerpt: '', content: '', cover_image_url: '', category: '', tags: '', meta_title: '', meta_description: '' });
                                setShowEditor(true);
                                setActiveTab('blog');
                            }}>+ New Post</button>
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                            >
                                {isLoggingOut ? 'Logging out...' : '🚪 Logout'}
                            </button>
                        </div>
                    </div>
                    <p className={styles.subtitle}>Manage your AI tools directory, blog, and submissions</p>
                </div>

                {/* Stats */}
                <div className={styles.statsGrid}>
                    {stats.map(stat => (
                        <div key={stat.label} className={styles.statCard}>
                            <span className={styles.statIcon}>{stat.icon}</span>
                            <div>
                                <span className={styles.statValue} style={{ color: stat.color }}>{stat.value}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className={styles.tabs}>
                    {(['overview', 'blog', 'tools', 'submissions', 'messages'] as Tab[]).map(tab => (
                        <button key={tab}
                            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                            onClick={() => { setActiveTab(tab); if (tab !== 'blog') setShowEditor(false); }}
                        >
                            {tab === 'overview' ? '📊' : tab === 'blog' ? '📝' : tab === 'tools' ? '🤖' : tab === 'submissions' ? '📥' : '📬'}
                            {' '}{tab.charAt(0).toUpperCase() + tab.slice(1)}
                            {tab === 'submissions' && pendingSubs.length > 0 && <span className={styles.badge}>{pendingSubs.length}</span>}
                            {tab === 'messages' && messages.length > 0 && <span className={styles.badge}>{messages.length}</span>}
                        </button>
                    ))}
                </div>

                {saveMsg && <div className={styles.toast}>{saveMsg}</div>}

                <div className={styles.tabContent}>
                    {/* === OVERVIEW TAB === */}
                    {activeTab === 'overview' && (
                        <div>
                            <h2 className={styles.sectionTitle}>Quick Actions</h2>
                            <div className={styles.actionsGrid}>
                                <button className={styles.actionCard} onClick={() => { setActiveTab('blog'); setShowEditor(true); resetForm(); }}>
                                    <span>✍️</span><strong>Write Blog Post</strong><p>Create a new article</p>
                                </button>
                                <button className={styles.actionCard} onClick={() => setActiveTab('tools')}>
                                    <span>🤖</span><strong>Manage Tools</strong><p>{approvedTools.length} listed tools</p>
                                </button>
                                <button className={styles.actionCard} onClick={() => setActiveTab('submissions')}>
                                    <span>📥</span><strong>Review Submissions</strong><p>{pendingSubs.length} pending</p>
                                </button>
                                <Link href="/" className={styles.actionCard} target="_blank">
                                    <span>🌐</span><strong>View Site</strong><p>Open public website</p>
                                </Link>
                            </div>

                            <h2 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>Recent Blog Posts</h2>
                            <div className={styles.tableWrap}>
                                <table className={styles.table}>
                                    <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                                    <tbody>
                                        {posts.slice(0, 5).map(post => (
                                            <tr key={post.id}>
                                                <td><strong>{post.title}</strong></td>
                                                <td><span className="badge badge-new">{post.category}</span></td>
                                                <td><span className={`badge ${post.published_at ? 'badge-approved' : 'badge-pending'}`}>{post.published_at ? '✅ Live' : '📝 Draft'}</span></td>
                                                <td>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-IN') : '—'}</td>
                                                <td className={styles.actionBtns}>
                                                    <button className="btn btn-sm btn-ghost" onClick={() => handleEditPost(post)}>Edit</button>
                                                    <button className="btn btn-sm btn-ghost" style={{ color: 'var(--red, #ef4444)' }} onClick={() => handleDeletePost(post.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* === BLOG CMS TAB === */}
                    {activeTab === 'blog' && (
                        <div>
                            <div className={styles.tabHeader}>
                                <h2 className={styles.sectionTitle}>Blog CMS</h2>
                                <button className="btn btn-primary btn-sm" onClick={() => { setShowEditor(!showEditor); if (showEditor) resetForm(); }}>
                                    {showEditor ? '✕ Close Editor' : '+ New Post'}
                                </button>
                            </div>

                            {/* Blog Editor */}
                            {showEditor && (
                                <div className={styles.formCard}>
                                    <h3 className={styles.formTitle}>{editingPost ? `Editing: ${editingPost.title}` : '✍️ Create New Post'}</h3>

                                    <div className={styles.formGrid}>
                                        <div className="input-group">
                                            <label>Title *</label>
                                            <input type="text" className="input-field" placeholder="Your awesome article title" value={newPost.title} onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))} />
                                        </div>
                                        <div className="input-group">
                                            <label>Slug (auto-generated if empty)</label>
                                            <input type="text" className="input-field" placeholder="url-friendly-slug" value={newPost.slug} onChange={e => setNewPost(p => ({ ...p, slug: e.target.value }))} />
                                        </div>
                                        <div className="input-group">
                                            <label>Category *</label>
                                            <select className="input-field" value={newPost.category} onChange={e => setNewPost(p => ({ ...p, category: e.target.value }))}>
                                                <option value="">Select</option>
                                                <option value="Education">Education</option>
                                                <option value="Comparison">Comparison</option>
                                                <option value="Best Lists">Best Lists</option>
                                                <option value="Pricing">Pricing / Questions</option>
                                                <option value="Guides">How-to / Guides</option>
                                                <option value="Education">Education</option>
                                                <option value="Comparisons">Comparisons (Legacy)</option>
                                                <option value="Business">Business</option>
                                                <option value="Industry">Industry</option>
                                                <option value="Development">Development</option>
                                                <option value="Tutorials">Tutorials</option>
                                                <option value="News">News</option>
                                                <option value="General">General</option>
                                            </select>
                                        </div>
                                        <div className="input-group">
                                            <label>Cover Image</label>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <input type="text" className="input-field" placeholder="https://images.unsplash.com/..." value={newPost.cover_image_url} onChange={e => setNewPost(p => ({ ...p, cover_image_url: e.target.value }))} style={{ flex: 1 }} />
                                                <input
                                                    type="file"
                                                    ref={coverInputRef}
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleCoverImageUpload}
                                                    style={{ display: 'none' }}
                                                />
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => coverInputRef.current?.click()}
                                                    disabled={isUploadingCover}
                                                    title="Upload Image"
                                                >
                                                    {isUploadingCover ? '⏳' : '📤 Upload'}
                                                </button>
                                            </div>
                                            {newPost.cover_image_url && (
                                                <div style={{ marginTop: '0.5rem', borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border-color)', height: '150px', position: 'relative' }}>
                                                    <img src={newPost.cover_image_url} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="input-group" style={{ marginTop: '1rem' }}>
                                        <label>Tags (comma-separated)</label>
                                        <input type="text" className="input-field" placeholder="ai, tools, india" value={newPost.tags} onChange={e => setNewPost(p => ({ ...p, tags: e.target.value }))} />
                                    </div>

                                    <div className="input-group" style={{ marginTop: '1rem' }}>
                                        <label>Excerpt *</label>
                                        <input type="text" className="input-field" placeholder="Brief summary that appears on cards..." value={newPost.excerpt} onChange={e => setNewPost(p => ({ ...p, excerpt: e.target.value }))} />
                                    </div>

                                    <div className="input-group" style={{ marginTop: '1rem' }}>
                                        <label>Content *</label>
                                        <RichTextEditor
                                            value={newPost.content}
                                            onChange={(value) => setNewPost(p => ({ ...p, content: value }))}
                                            placeholder="Write your article here... Use the toolbar above to format your content."
                                        />
                                    </div>

                                    <details style={{ marginTop: '1rem' }}>
                                        <summary style={{ cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>🔍 SEO Settings (optional)</summary>
                                        <div className={styles.formGrid} style={{ marginTop: '0.75rem' }}>
                                            <div className="input-group">
                                                <label>Meta Title</label>
                                                <input type="text" className="input-field" placeholder="SEO title" value={newPost.meta_title} onChange={e => setNewPost(p => ({ ...p, meta_title: e.target.value }))} />
                                            </div>
                                            <div className="input-group">
                                                <label>Meta Description</label>
                                                <input type="text" className="input-field" placeholder="SEO description" value={newPost.meta_description} onChange={e => setNewPost(p => ({ ...p, meta_description: e.target.value }))} />
                                            </div>

                                            {/* SEO Preview Card */}
                                            <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--surface-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border-color)' }}>
                                                <label style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>Search Engine Preview</label>
                                                <div style={{ fontFamily: 'arial, sans-serif' }}>
                                                    <div style={{ fontSize: '14px', color: '#202124', marginBottom: '4px' }}>aibrainx.in › blog › {newPost.slug || 'your-post-slug'}</div>
                                                    <div style={{ fontSize: '20px', color: '#1a0dab', lineHeight: '1.3', marginBottom: '4px', cursor: 'pointer', textDecoration: 'hover:underline' }}>
                                                        {newPost.meta_title || newPost.title || 'Your Post Title'}
                                                    </div>
                                                    <div style={{ fontSize: '14px', color: '#4d5156', lineHeight: '1.58' }}>
                                                        {(newPost.meta_description || newPost.excerpt || 'Your post description will appear here in search results...').substring(0, 160)}...
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </details>

                                    <div className={styles.formActions}>
                                        {editingPost && <button className="btn btn-ghost" onClick={resetForm}>Cancel</button>}
                                        <button className="btn btn-secondary"
                                            disabled={!newPost.title || !newPost.content}
                                            onClick={() => handleSavePost(false)}
                                        >💾 Save Draft</button>
                                        <button className="btn btn-primary"
                                            disabled={!newPost.title || !newPost.content || !newPost.excerpt}
                                            onClick={() => handleSavePost(true)}
                                        >🚀 Publish</button>
                                    </div>
                                </div>
                            )}

                            {/* Existing Posts */}
                            <h3 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>All Posts ({posts.length})</h3>
                            <div className={styles.tableWrap}>
                                <table className={styles.table}>
                                    <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Date</th><th>Views</th><th>Actions</th></tr></thead>
                                    <tbody>
                                        {posts.map(post => (
                                            <tr key={post.id}>
                                                <td>
                                                    <strong>{post.title}</strong>
                                                    <br /><span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/{post.slug}</span>
                                                </td>
                                                <td><span className="badge badge-new">{post.category}</span></td>
                                                <td><span className={`badge ${post.published_at ? 'badge-approved' : 'badge-pending'}`}>{post.published_at ? '✅ Live' : '📝 Draft'}</span></td>
                                                <td>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-IN') : '—'}</td>
                                                <td style={{ color: 'var(--text-muted)' }}>—</td>
                                                <td className={styles.actionBtns}>
                                                    {post.published_at && <Link href={`/blog/${post.slug}`} className="btn btn-sm btn-ghost" target="_blank">View</Link>}
                                                    <button className="btn btn-sm btn-ghost" onClick={() => handleEditPost(post)}>Edit</button>
                                                    <button className="btn btn-sm btn-ghost" style={{ color: 'var(--red, #ef4444)' }} onClick={() => handleDeletePost(post.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* === TOOLS TAB === */}
                    {activeTab === 'tools' && (
                        <div>
                            <h2 className={styles.sectionTitle}>Tool Management ({toolsList.length} tools)</h2>
                            <div className={styles.tableWrap}>
                                <table className={styles.table}>
                                    <thead><tr><th>Tool</th><th>Category</th><th>Pricing</th><th>Rating</th><th>Featured</th><th>Actions</th></tr></thead>
                                    <tbody>
                                        {toolsList.map(tool => (
                                            <tr key={tool.id}>
                                                <td>
                                                    <div className={styles.toolCell}>
                                                        <span>{categories.find(c => c.id === tool.category_id)?.icon}</span>
                                                        <div>
                                                            <strong>{tool.name}</strong>
                                                            <br /><span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{tool.tagline}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{categories.find(c => c.id === tool.category_id)?.name}</td>
                                                <td><span className={`badge badge-${tool.pricing}`}>
                                                    {tool.pricing === 'free' ? '🆓 Free' : tool.pricing === 'freemium' ? '⚡ Freemium' : '💰 Paid'}
                                                </span></td>
                                                <td>⭐ {tool.rating}</td>
                                                <td>{tool.featured ? '🌟 Yes' : '—'}</td>
                                                <td className={styles.actionBtns}>
                                                    <Link href={`/tools/${tool.slug}`} className="btn btn-sm btn-ghost" target="_blank">View</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* === SUBMISSIONS TAB === */}
                    {activeTab === 'submissions' && (
                        <div>
                            <h2 className={styles.sectionTitle}>Tool Submissions ({submissions.length})</h2>
                            {submissions.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <span style={{ fontSize: '3rem' }}>📭</span>
                                    <h3>No submissions yet</h3>
                                    <p>New tool submissions from the public form will appear here for review.</p>
                                </div>
                            ) : (
                                <div className={styles.tableWrap}>
                                    <table className={styles.table}>
                                        <thead><tr><th>Tool</th><th>URL</th><th>Contact</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                                        <tbody>
                                            {submissions.map(sub => (
                                                <tr key={sub.id}>
                                                    <td><strong>{sub.toolName}</strong></td>
                                                    <td><a href={sub.toolUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>{sub.toolUrl}</a></td>
                                                    <td>{sub.contactName}<br /><span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{sub.email}</span></td>
                                                    <td><span className={`badge badge-${sub.status}`}>
                                                        {sub.status === 'pending' ? '⏳ Pending' : sub.status === 'approved' ? '✅ Approved' : '❌ Rejected'}
                                                    </span></td>
                                                    <td>{new Date(sub.submittedAt).toLocaleDateString('en-IN')}</td>
                                                    <td className={styles.actionBtns}>
                                                        {sub.status === 'pending' && (
                                                            <>
                                                                <button className="btn btn-sm btn-primary" onClick={() => handleSubmissionAction(sub.id, 'approved')}>✅ Approve</button>
                                                                <button className="btn btn-sm btn-ghost" style={{ color: 'var(--red, #ef4444)' }} onClick={() => handleSubmissionAction(sub.id, 'rejected')}>❌ Reject</button>
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* === MESSAGES TAB === */}
                    {activeTab === 'messages' && (
                        <div>
                            <h2 className={styles.sectionTitle}>Contact Messages ({messages.length})</h2>
                            {messages.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <span style={{ fontSize: '3rem' }}>📬</span>
                                    <h3>No messages yet</h3>
                                    <p>Messages from the contact form will appear here.</p>
                                </div>
                            ) : (
                                <div className={styles.messageList}>
                                    {messages.map(msg => (
                                        <div key={msg.id} className={styles.messageCard}>
                                            <div className={styles.messageHeader}>
                                                <div>
                                                    <strong>{msg.name}</strong>
                                                    <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', marginLeft: '0.5rem' }}>{msg.email}</span>
                                                </div>
                                                <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{new Date(msg.date).toLocaleDateString('en-IN')}</span>
                                            </div>
                                            <div className={styles.messageSubject}>{msg.subject}</div>
                                            <p className={styles.messageBody}>{msg.message}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}
