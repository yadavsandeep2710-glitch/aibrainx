import { tools, blogPosts } from '@/lib/data';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://aibrainx.in';

    const staticPages = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
        { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
        { url: `${baseUrl}/submit`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    ];

    const toolPages = tools
        .filter(t => t.status === 'approved')
        .map(tool => ({
            url: `${baseUrl}/tools/${tool.slug}`,
            lastModified: new Date(tool.updated_at),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

    const blogPages = blogPosts
        .filter(p => p.published)
        .map(post => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updated_at),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));

    return [...staticPages, ...toolPages, ...blogPages];
}
