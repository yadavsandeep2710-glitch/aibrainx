import { createClient } from './supabase';
import { BlogPost, Tool } from './types';
import { tools as initialTools, reviews as initialReviews, categories } from './data';
import { createClient as createServerClient } from '@supabase/supabase-js';

// ===== Blog Posts (Supabase) =====

// Helper to get the right client based on environment
function getSupabaseClient() {
    if (typeof window === 'undefined') {
        // Server environment - use service role or anon key with standard client
        // For public data reading, anon key is fine.
        return createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
    }
    // Client environment
    return createClient();
}

export async function getPosts(): Promise<BlogPost[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
    return data as BlogPost[];
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .not('published_at', 'is', null) // Filter where published_at is NOT null
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching published posts:', error);
        return [];
    }
    return data as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        // console.error('Error fetching post by slug:', error);
        return null;
    }
    return data as BlogPost;
}

export async function createPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> {
    const supabase = createClient(); // Always client here for admin actions? Or should be server?
    // If admin is client-side, use browser client.
    const postWithDerivedPublished = {
        ...post,
        published_at: post.published_at,
        // Remove 'published' if it exists in the input object to avoid error
    };
    // Need to cast to any or omit 'published' from the input type in the function signature if strictly typed
    // But since Omit<BlogPost...> is used, we should be fine if we ensure the object passed doesn't have it.
    // However, the caller might pass it.
    const { published, ...postData } = post as any;

    const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select()
        .single();

    if (error) {
        console.error('Error creating post:', error);
        throw error;
    }
    return data as BlogPost;
}

export async function updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const supabase = createClient();
    // Remove 'published' from updates
    const { published, ...updateData } = updates as any;

    const { data, error } = await supabase
        .from('blog_posts')
        .update({ ...updateData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating post:', error);
        throw error;
    }
    return data as BlogPost;
}

export async function deletePost(id: string): Promise<boolean> {
    const supabase = createClient();
    const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting post:', error);
        return false;
    }
    return true;
}


// ===== Tools (LocalStorage - unchanged for now) =====
const STORAGE_KEY_TOOLS = 'aibrainx_tools';
const STORAGE_KEY_POSTS = 'aibrainx_blog_posts'; // Legacy

function isBrowser(): boolean {
    return typeof window !== 'undefined';
}

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

// ===== Legacy Functions =====
export function getAllBlogPosts(): BlogPost[] {
    if (!isBrowser()) return [];
    return [];
}
export function saveBlogPost(post: BlogPost): void { console.warn('Deprecated'); }
export function deleteBlogPost(id: string): void { console.warn('Deprecated'); }

// ===== Re-exports =====
export { initialTools, initialReviews as reviews, categories };

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

export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
