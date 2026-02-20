'use server';

import { createAdminClient } from '@/lib/supabase-admin';
import { BlogPost } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// Helper to check if user is admin via cookie
async function isAdmin() {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin_session')?.value;
    console.log('isAdmin check - admin_session cookie:', adminSession);
    return adminSession === 'true';
}

export async function createPostAction(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
    try {
        console.log('--- START createPostAction ---');
        console.log('Post Title:', post.title);
        console.log('Post Content Length:', post.content?.length || 0);

        if (!(await isAdmin())) {
            console.error('Unauthorized attempt to create post');
            return { success: false, error: 'Unauthorized' };
        }

        const supabase = createAdminClient();
        const { published, ...postData } = post as any;

        console.log('Inserting into blog_posts table...');
        const { data, error } = await supabase
            .from('blog_posts')
            .insert([postData])
            .select()
            .single();

        if (error) {
            console.error('DATABASE ERROR (createPost):', error);
            return { success: false, error: `Database error: ${error.message}` };
        }

        console.log('Post created successfully:', data?.id);
        revalidatePath('/blog');
        revalidatePath('/admin');
        return JSON.parse(JSON.stringify({ success: true, data: data as BlogPost }));
    } catch (err: any) {
        console.error('CRITICAL ERROR in createPostAction:', err);
        return { success: false, error: `Server error: ${err.message || 'An unexpected error occurred'}` };
    }
}

export async function updatePostAction(id: string, updates: Partial<BlogPost>) {
    try {
        console.log('--- START updatePostAction ---');
        console.log('Post ID:', id);
        console.log('Updates keys:', Object.keys(updates));

        if (!(await isAdmin())) {
            console.error('Unauthorized attempt to update post');
            return { success: false, error: 'Unauthorized' };
        }

        const supabase = createAdminClient();
        const { published, ...updateData } = updates as any;

        console.log('Updating blog_posts table...');
        const { data, error } = await supabase
            .from('blog_posts')
            .update({ ...updateData, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('DATABASE ERROR (updatePost):', error);
            return { success: false, error: `Database error: ${error.message}` };
        }

        console.log('Post updated successfully:', data?.id);
        revalidatePath('/blog');
        if (data.slug) revalidatePath(`/blog/${data.slug}`);
        revalidatePath('/admin');
        return JSON.parse(JSON.stringify({ success: true, data: data as BlogPost }));
    } catch (err: any) {
        console.error('CRITICAL ERROR in updatePostAction:', err);
        return { success: false, error: `Server error: ${err.message || 'An unexpected error occurred'}` };
    }
}

export async function deletePostAction(id: string) {
    try {
        if (!(await isAdmin())) {
            return { success: false, error: 'Unauthorized' };
        }

        const supabase = createAdminClient();
        const { error } = await supabase
            .from('blog_posts')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('SERVER ACTION ERROR (deletePost):', error);
            return { success: false, error: error.message };
        }

        revalidatePath('/blog');
        revalidatePath('/admin');
        return { success: true };
    } catch (err: any) {
        console.error('CRITICAL ACTION ERROR (deletePost):', err);
        return { success: false, error: err.message || 'An unexpected error occurred' };
    }
}
