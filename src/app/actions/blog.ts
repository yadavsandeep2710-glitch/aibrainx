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
    if (!(await isAdmin())) {
        throw new Error('Unauthorized');
    }

    const supabase = createAdminClient();
    const { published, ...postData } = post as any;

    const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select()
        .single();

    if (error) {
        console.error('SERVER ACTION ERROR (createPost):', error);
        throw new Error(error.message);
    }

    revalidatePath('/blog');
    revalidatePath('/admin');
    return data as BlogPost;
}

export async function updatePostAction(id: string, updates: Partial<BlogPost>) {
    if (!(await isAdmin())) {
        throw new Error('Unauthorized');
    }

    const supabase = createAdminClient();
    const { published, ...updateData } = updates as any;

    const { data, error } = await supabase
        .from('blog_posts')
        .update({ ...updateData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('SERVER ACTION ERROR (updatePost):', error);
        throw new Error(error.message);
    }

    revalidatePath('/blog');
    revalidatePath(`/blog/${data.slug}`);
    revalidatePath('/admin');
    return data as BlogPost;
}

export async function deletePostAction(id: string) {
    if (!(await isAdmin())) {
        throw new Error('Unauthorized');
    }

    const supabase = createAdminClient();
    const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting post:', error);
        throw new Error(error.message);
    }

    revalidatePath('/blog');
    revalidatePath('/admin');
    return true;
}
