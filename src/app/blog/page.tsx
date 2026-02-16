import { getPublishedPosts } from '@/lib/store';
import BlogInterface from '@/components/BlogInterface';
import styles from './page.module.css';
import Link from 'next/link';

export const metadata = {
    title: 'AI Insider | Premium AI Insights for India',
    description: 'Deep dives, strategic analysis, and expert reviews of the AI landscape in India. Read the future, today.',
    keywords: 'AI, Artificial Intelligence, India, ChatGPT, Gemini, Midjourney, AI tools, machine learning, deep learning, technology, tech news, AI guides, AI tutorials, Indian AI, AI for students, AI for businesses',
    authors: ['AI Insider Editorial Team'],
    category: 'Technology',
    image: '/social/blog-cover.jpg',
    publishedAt: '2026-02-15',
    updatedAt: '2026-02-15',
    alternates: {
        canonical: '/blog',
        languages: {
            en: '/blog'
        }
    }
};

export default async function BlogPage() {
    const posts = await getPublishedPosts();

    return (
        <div className={styles.page}>
            <div className={styles.bgGradient}></div>
            <div className="container">
                <header className={styles.header}>
                    <span className={styles.label}>The Editorial</span>
                    <h1 className={styles.title}>AI BrainX Blog</h1>
                    <p className={styles.subtitle}>
                        Expert insights, tool reviews, and strategic analysis of the AI landscape in India.
                    </p>
                </header>

                <BlogInterface initialPosts={posts} />
            </div>
        </div>
    );
}
