// ===== AIBrainX.in Type Definitions =====

export interface Category {
    id: string;
    name: string;
    slug: string;
    icon: string;
    description: string;
    tool_count: number;
}

export interface Tool {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    description: string;
    url: string;
    logo_url: string;
    screenshot_url?: string;
    category_id: string;
    category?: Category;
    pricing: 'free' | 'freemium' | 'paid';
    pricing_details?: string;
    rating: number;
    review_count: number;
    featured: boolean;
    status: 'pending' | 'approved' | 'rejected';
    submitted_by?: string;
    tags: string[];
    created_at: string;
    updated_at: string;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image_url: string;
    author: string;
    category: string;
    tags: string[];
    published: boolean;
    published_at: string | null;
    read_time: number;
    meta_title?: string | null;
    meta_description?: string | null;
    created_at: string;
    updated_at: string;
}

export interface Review {
    id: string;
    tool_id: string;
    user_id: string;
    user_name: string;
    user_avatar?: string;
    rating: number;
    comment: string;
    created_at: string;
}

export interface ToolSubmission {
    id: string;
    tool_name: string;
    tool_url: string;
    description: string;
    category_id: string;
    submitted_by: string;
    email: string;
    payment_id?: string;
    payment_status: 'pending' | 'completed' | 'failed';
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

export interface UserProfile {
    id: string;
    email: string;
    display_name: string;
    avatar_url?: string;
    role: 'user' | 'admin';
    created_at: string;
}
