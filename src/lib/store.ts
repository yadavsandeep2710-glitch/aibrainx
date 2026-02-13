'use client';

import { BlogPost, Tool } from './types';
import { blogPosts as initialPosts, tools as initialTools, reviews as initialReviews, categories } from './data';

// ===== Client-side Data Store =====
// Persists admin changes to localStorage so blog posts
// created in admin appear on the public site.
// In production, replace with Supabase queries.

const STORAGE_KEY_POSTS = 'aibrainx_blog_posts';
const STORAGE_KEY_TOOLS = 'aibrainx_tools';

function isBrowser(): boolean {
    return typeof window !== 'undefined';
}

// ===== Blog Posts =====
export function getAllBlogPosts(): BlogPost[] {
    if (!isBrowser()) return initialPosts;
    try {
        const stored = localStorage.getItem(STORAGE_KEY_POSTS);
        if (stored) {
            const parsed: BlogPost[] = JSON.parse(stored);
            return parsed.length > 0 ? parsed : initialPosts;
        }
    } catch { /* ignore */ }
    return initialPosts;
}

export function getPublishedBlogPosts(): BlogPost[] {
    return getAllBlogPosts().filter(p => p.published);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return getAllBlogPosts().find(p => p.slug === slug);
}

export function saveBlogPost(post: BlogPost): void {
    if (!isBrowser()) return;
    const posts = getAllBlogPosts();
    const idx = posts.findIndex(p => p.id === post.id);
    if (idx >= 0) {
        posts[idx] = post;
    } else {
        posts.unshift(post);
    }
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts));
}

export function deleteBlogPost(id: string): void {
    if (!isBrowser()) return;
    const posts = getAllBlogPosts().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts));
}

// ===== Tools =====
export function getAllTools(): Tool[] {
    if (!isBrowser()) return initialTools;
    try {
        const stored = localStorage.getItem(STORAGE_KEY_TOOLS);
        if (stored) {
            const parsed: Tool[] = JSON.parse(stored);
            return parsed.length > 0 ? parsed : initialTools;
        }
    } catch { /* ignore */ }
    return initialTools;
}

export function getApprovedTools(): Tool[] {
    return getAllTools().filter(t => t.status === 'approved');
}

export function getToolBySlug(slug: string): Tool | undefined {
    return getAllTools().find(t => t.slug === slug);
}

export function saveTool(tool: Tool): void {
    if (!isBrowser()) return;
    const toolsList = getAllTools();
    const idx = toolsList.findIndex(t => t.id === tool.id);
    if (idx >= 0) {
        toolsList[idx] = tool;
    } else {
        toolsList.unshift(tool);
    }
    localStorage.setItem(STORAGE_KEY_TOOLS, JSON.stringify(toolsList));
}

// ===== Re-exports =====
export { initialPosts, initialTools, initialReviews as reviews, categories };

// ===== Newsletter =====
const STORAGE_KEY_NEWSLETTER = 'aibrainx_newsletter_emails';

export function subscribeNewsletter(email: string): { success: boolean; message: string } {
    if (!isBrowser()) return { success: false, message: 'Not available' };
    try {
        const stored = localStorage.getItem(STORAGE_KEY_NEWSLETTER);
        const emails: string[] = stored ? JSON.parse(stored) : [];
        if (emails.includes(email.toLowerCase())) {
            return { success: false, message: 'You\'re already subscribed!' };
        }
        emails.push(email.toLowerCase());
        localStorage.setItem(STORAGE_KEY_NEWSLETTER, JSON.stringify(emails));
        return { success: true, message: 'Successfully subscribed! 🎉' };
    } catch {
        return { success: false, message: 'Something went wrong. Try again.' };
    }
}

// ===== Contact form =====
const STORAGE_KEY_CONTACTS = 'aibrainx_contact_messages';

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
}

export function submitContactMessage(msg: Omit<ContactMessage, 'id' | 'date'>): { success: boolean; message: string } {
    if (!isBrowser()) return { success: false, message: 'Not available' };
    try {
        const stored = localStorage.getItem(STORAGE_KEY_CONTACTS);
        const messages: ContactMessage[] = stored ? JSON.parse(stored) : [];
        messages.unshift({
            ...msg,
            id: Date.now().toString(),
            date: new Date().toISOString(),
        });
        localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(messages));
        return { success: true, message: 'Message sent successfully! We\'ll get back to you within 24 hours.' };
    } catch {
        return { success: false, message: 'Something went wrong. Try again.' };
    }
}

export function getContactMessages(): ContactMessage[] {
    if (!isBrowser()) return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY_CONTACTS);
        return stored ? JSON.parse(stored) : [];
    } catch { return []; }
}

// ===== Tool Submissions =====
const STORAGE_KEY_SUBMISSIONS = 'aibrainx_tool_submissions';

export interface ToolSubmission {
    id: string;
    toolName: string;
    toolUrl: string;
    description: string;
    categoryId: string;
    pricing: string;
    contactName: string;
    email: string;
    status: 'pending' | 'approved' | 'rejected';
    submittedAt: string;
    paymentStatus: 'paid';
}

export function submitToolListing(data: Omit<ToolSubmission, 'id' | 'status' | 'submittedAt' | 'paymentStatus'>): { success: boolean; message: string } {
    if (!isBrowser()) return { success: false, message: 'Not available' };
    try {
        const stored = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
        const subs: ToolSubmission[] = stored ? JSON.parse(stored) : [];
        subs.unshift({
            ...data,
            id: Date.now().toString(),
            status: 'pending',
            submittedAt: new Date().toISOString(),
            paymentStatus: 'paid',
        });
        localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(subs));
        return { success: true, message: 'Tool submitted successfully!' };
    } catch {
        return { success: false, message: 'Something went wrong.' };
    }
}

export function getToolSubmissions(): ToolSubmission[] {
    if (!isBrowser()) return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
        return stored ? JSON.parse(stored) : [];
    } catch { return []; }
}

export function updateSubmissionStatus(id: string, status: 'approved' | 'rejected'): void {
    if (!isBrowser()) return;
    const subs = getToolSubmissions();
    const idx = subs.findIndex(s => s.id === id);
    if (idx >= 0) {
        subs[idx].status = status;
        localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(subs));
    }
}

// ===== Generate unique ID =====
export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
