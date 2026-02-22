// ===== AI Prompt Library Type Definitions =====

export interface AIPrompt {
    id: string;
    title: string;
    category: string;
    description: string;
    prompt_text: string;
    example_output?: string;
    tags: string[];
    language: string;
    region: string;
    is_indexable: boolean;
}

export interface PromptCategory {
    slug: string;
    name: string;
    icon: string;
    description: string;
    meta_title: string;
    meta_description: string;
    prompt_count: number;
    related_blog_slugs: string[];
    faqs: { question: string; answer: string }[];
}
