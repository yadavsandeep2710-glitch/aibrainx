export interface Product {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    price_inr: number;
    original_price_inr: number;
    product_type: 'guide' | 'sheet' | 'bundle' | 'report';
    features: string[];
    // Extended fields for detail page
    hero_badge?: string;
    problem_title?: string;
    problem_items?: { icon: string; title: string; description: string }[];
    whats_inside_items?: { icon: string; title: string; description: string }[];
    who_is_for_items?: { icon: string; title: string; description: string }[];
    testimonials?: { rating: number; text: string; author: string; role: string }[];
    faqs?: { question: string; answer: string }[];
}

export const products: Product[] = [
    // 1. Guides
    {
        slug: 'best-ai-tools-india',
        title: 'Best AI Tools for Students & Creators in India (2026)',
        subtitle: 'India-focused, practical, updated yearly',
        description: 'Stop wasting money on wrong AI tools. Get expert recommendations for students, creators, and freelancers with pricing in ₹.',
        price_inr: 399,
        original_price_inr: 599,
        product_type: 'guide',
        features: [
            '50+ AI tools reviewed and compared',
            'Pricing in ₹ for Indian users',
            'Category-wise recommendations',
            'Free vs Paid comparisons',
            'Step-by-step setup guides',
            'Real use cases for students & creators',
            'Monthly updates for 1 year'
        ],
        hero_badge: '📚 Premium Guide',
        problem_title: 'The Problem: Too Many AI Tools, Too Much Confusion',
        problem_items: [
            { icon: '😵', title: '1000+ New Tools Every Month', description: 'With so many AI tools launching daily, how do you know which ones are worth your time and money?' },
            { icon: '💸', title: 'Wasted Money on Wrong Tools', description: 'Most people subscribe to tools they never use or pick the wrong tool for their specific needs.' },
            { icon: '⏰', title: 'Hours of Research Wasted', description: 'Endless YouTube videos, blog posts, and reviews that still leave you confused about what to choose.' }
        ],
        whats_inside_items: [
            { icon: '✓', title: '50+ AI Tools Reviewed', description: 'Detailed reviews of the most popular AI tools across all categories' },
            { icon: '✓', title: 'Pricing in ₹', description: 'All pricing converted to Indian Rupees with payment method compatibility' },
            { icon: '✓', title: 'Category-wise Recommendations', description: 'Best tools for writing, design, video, coding, research, and more' },
            { icon: '✓', title: 'Free vs Paid Comparisons', description: 'Know exactly when to use free tools and when paid tools are worth it' },
            { icon: '✓', title: 'Step-by-Step Setup Guides', description: 'Easy tutorials to get started with each recommended tool' },
            { icon: '✓', title: 'Real Use Cases', description: 'Practical examples for students, creators, freelancers, and businesses' }
        ],
        who_is_for_items: [
            { icon: '🎓', title: 'Students', description: 'Looking to boost productivity, ace assignments, and learn faster with AI tools for research, writing, and studying.' },
            { icon: '🎨', title: 'Content Creators', description: 'YouTubers, bloggers, and social media creators who want to create better content faster with AI.' },
            { icon: '💼', title: 'Freelancers', description: 'Designers, writers, developers, and marketers who want to work smarter and deliver better results.' },
            { icon: '🚀', title: 'Small Business Owners', description: 'Entrepreneurs who want to leverage AI for marketing, customer service, and operations without breaking the bank.' }
        ],
        testimonials: [
            { rating: 5, text: "This guide saved me so much time! I was overwhelmed by all the AI tools out there. Now I know exactly which ones to use for my YouTube channel.", author: "Priya Sharma", role: "Content Creator, Mumbai" },
            { rating: 5, text: "Finally, a guide with pricing in rupees! The comparisons are super helpful and the recommendations are spot-on for students.", author: "Rahul Verma", role: "Engineering Student, Bangalore" },
            { rating: 4, text: "Worth every rupee. The guide helped me choose the right design tools and I'm already saving money by avoiding unnecessary subscriptions.", author: "Anjali Patel", role: "Freelance Designer, Ahmedabad" }
        ],
        faqs: [
            { question: 'Is this guide updated regularly?', answer: 'Yes! You get free updates for 1 year. We update the guide every quarter with new tools and pricing changes.' },
            { question: 'What format is the guide in?', answer: "You'll receive a PDF file that works on any device. It's designed to be easy to read on mobile, tablet, or desktop." },
            { question: 'Can I get a refund?', answer: "Yes! If you're not satisfied within 7 days, email us for a full refund. No questions asked." },
            { question: 'Is the pricing really in Indian Rupees?', answer: 'Absolutely! All tools are priced in ₹ and we focus on tools that work well for Indian users and accept Indian payment methods.' },
            { question: 'How do I access the guide after purchase?', answer: "Immediately after payment, you'll get a download link. We'll also email you a permanent access link." }
        ]
    },
    {
        slug: 'ai-for-business-owners-india',
        title: 'AI for Small Business Owners in India (2026)',
        subtitle: 'Boost efficiency & profits with practical AI workflows',
        description: 'A complete playbook for Indian business owners. Learn how to use AI for marketing, sales, support, and operations without technical jargon.',
        price_inr: 599,
        original_price_inr: 999,
        product_type: 'guide',
        features: [
            'AI basics for non-tech founders',
            'Marketing & Sales automation workflows',
            'Customer support AI tools',
            'Indian pricing & UPI-friendly tools',
            'Case studies from Indian businesses',
            'Implementation checklists'
        ],
        hero_badge: '💼 Business Playbook',
        problem_title: 'Are You Falling Behind Your Competitors?',
        problem_items: [
            { icon: '📉', title: 'Losing Customers', description: 'Competitors using AI are responding faster and personalizing offers better.' },
            { icon: '⏳', title: 'Wasting Time on Manual Tasks', description: 'Doing everything manually while AI could automate 80% of your routine work.' },
            { icon: '💰', title: 'Rising Costs', description: 'Hiring more staff for tasks that AI could handle for a fraction of the cost.' }
        ],
        whats_inside_items: [
            { icon: '✓', title: 'AI Basics (Non-Technical)', description: 'Understand AI without the confusing jargon.' },
            { icon: '✓', title: 'Marketing & Sales', description: 'Generate leads and close deals faster with AI tools.' },
            { icon: '✓', title: 'Customer Support', description: 'Provide 24/7 support with AI chatbots and automation.' },
            { icon: '✓', title: 'Operations', description: 'Streamline invoicing, scheduling, and admin tasks.' },
            { icon: '✓', title: 'Indian Pricing & Tools', description: 'Tools that work in India with UPI support.' },
            { icon: '✓', title: 'Case Studies', description: 'Real examples of Indian businesses successfully using AI.' }
        ],
        who_is_for_items: [
            { icon: '🏬', title: 'Retail Owners', description: 'Optimize inventory and customer engagement.' },
            { icon: '💻', title: 'Agency Founders', description: 'Scale services without hiring more staff.' },
            { icon: '👨‍💼', title: 'Consultants', description: 'Automate client acquisition and reporting.' },
            { icon: '🏪', title: 'E-commerce Sellers', description: 'Automate product descriptions and customer support.' }
        ],
        faqs: [
            { question: 'Do I need technical skills?', answer: 'No! This guide is written specifically for non-technical business owners.' },
            { question: 'Are the tools expensive?', answer: 'We focus on affordable and high-ROI tools suitable for small businesses.' },
            { question: 'Is this relevant for India?', answer: 'Yes, 100%. We cover Indian payment methods, local tools, and relevant use cases.' }
        ]
    },
    {
        slug: 'ai-for-marketing',
        title: 'AI for Marketing: Content, Ads & Growth Playbook',
        subtitle: 'Scale your marketing with AI automation',
        description: 'Master AI for SEO, social media, ads, and email marketing. Includes prompt libraries and automation flows for modern marketers.',
        price_inr: 699,
        original_price_inr: 1299,
        product_type: 'guide',
        features: [
            'SEO & Blog writing workflows',
            'AI for Instagram Reels & YouTube',
            'Ad copy & creative generation',
            'Email marketing automation',
            'Growth hacking with AI tools',
            'Tool stacks for every budget'
        ],
        hero_badge: '🚀 Marketing Playbook',
        problem_title: 'Struggling to Keep Up with Content Demands?',
        problem_items: [
            { icon: '😫', title: 'Burnout from Content Creation', description: 'Writing blogs, emails, and social posts manually is exhausting.' },
            { icon: '📉', title: 'Low Ad Performance', description: 'Guessing what ad copy works instead of using data-driven AI.' },
            { icon: '🐌', title: 'Slow Growth', description: 'Competitors are scaling faster because they automate their marketing.' }
        ],
        whats_inside_items: [
            { icon: '✓', title: 'SEO & Blog Writing', description: 'Generate SEO-optimized articles in minutes.' },
            { icon: '✓', title: 'Social Media AI', description: 'Create content for Instagram, LinkedIn, and YouTube effortlessly.' },
            { icon: '✓', title: 'Ad Copy & Creatives', description: 'Generate high-converting ad variants instantly.' },
            { icon: '✓', title: 'Email Automation', description: 'Personalize email campaigns at scale.' },
            { icon: '✓', title: 'Prompt Library', description: 'Copy-paste prompts for every marketing task.' },
            { icon: '✓', title: 'Tool Stacks', description: 'Curated tool combinations for different budgets.' }
        ],
        who_is_for_items: [
            { icon: '📢', title: 'Digital Marketers', description: 'Automate routine tasks and focus on strategy.' },
            { icon: '✍️', title: 'Copywriters', description: 'Beat writer\'s block and produce more variations.' },
            { icon: '📱', title: 'Social Media Managers', description: 'Keep your content calendar full without the stress.' },
            { icon: '📈', title: 'Growth Hackers', description: 'Experiment faster and scale winning strategies.' }
        ]
    },
    {
        slug: 'ai-prompt-engineering',
        title: 'AI Prompt Engineering Master Guide',
        subtitle: 'Unlock the full potential of ChatGPT & Claude',
        description: 'Stop guessing. Learn the science of writing perfect prompts. Includes a copy-paste library of 500+ proven prompts for every use case.',
        price_inr: 499,
        original_price_inr: 899,
        product_type: 'guide',
        features: [
            'Core prompt frameworks (R-T-F, etc.)',
            'Advanced prompting techniques',
            '500+ Copy-paste prompt library',
            'Prompts for writing, coding, & design',
            'Debugging & refining prompts',
            'Works with ChatGPT, Claude, & Gemini'
        ],
        hero_badge: '🧠 Skill Masterclass',
        problem_title: 'Are You Getting Mediocre Results from AI?',
        problem_items: [
            { icon: '🤷', title: 'Generic Answers', description: 'AI gives you boring, generic responses that everyone else gets.' },
            { icon: '⏳', title: 'Constant Rewriting', description: 'Spending more time fixing AI output than it would take to write it yourself.' },
            { icon: '😕', title: 'Confusion', description: 'Not knowing how to structure requests for complex tasks.' }
        ],
        whats_inside_items: [
            { icon: '✓', title: 'Prompt Fundamentals', description: 'Learn the core principles of effective prompting.' },
            { icon: '✓', title: 'Advanced Frameworks', description: 'Master techniques like Chain-of-Thought and Few-Shot prompting.' },
            { icon: '✓', title: '500+ Prompt Library', description: 'A massive collection of copy-paste prompts for any situation.' },
            { icon: '✓', title: 'Category-based Prompts', description: 'Prompts specifically for coding, writing, marketing, and design.' },
            { icon: '✓', title: 'Debugging Prompts', description: 'How to fix prompts when AI goes off the rails.' },
            { icon: '✓', title: 'Multi-Model Support', description: 'Techniques that work across ChatGPT, Claude, and Gemini.' }
        ],
        who_is_for_items: [
            { icon: '👨‍💻', title: 'Developers', description: 'Generate better code and debug faster.' },
            { icon: '✍️', title: 'Writers', description: 'Create unique, high-quality content that doesn\'t sound robotic.' },
            { icon: '🎓', title: 'Students', description: 'Use AI as a personalized tutor and research assistant.' },
            { icon: '🤖', title: 'AI Enthusiasts', description: 'Take your AI skills to the professional level.' }
        ]
    },
    {
        slug: 'ai-chatbots-comparison',
        title: 'AI Chatbots Comparison: Website & Business Use',
        subtitle: 'Find the perfect chatbot for your business',
        description: 'A detailed comparison of top AI chatbots for websites and WhatsApp. Includes feature tables, pricing analysis, and implementation guides.',
        price_inr: 399,
        original_price_inr: 699,
        product_type: 'report',
        features: [
            'Website vs WhatsApp chatbots',
            'Detailed feature & pricing tables',
            'ROI analysis for businesses',
            'No-code vs Custom solution comparison',
            'Implementation roadmap',
            'Vendor recommendations'
        ],
        hero_badge: '📊 Research Report',
        problem_title: 'Confused by Chatbot Options?',
        problem_items: [
            { icon: '🤯', title: 'Overwhelming Choice', description: 'Hundreds of chatbot platforms with confusing pricing models.' },
            { icon: '💰', title: 'Hidden Costs', description: 'Signing up for "cheap" tools that get expensive as you scale.' },
            { icon: '🔧', title: 'Integration Nightmares', description: 'Choosing tools that don\'t play nice with your existing website.' }
        ],
        whats_inside_items: [
            { icon: '✓', title: 'Platform Comparisons', description: 'In-depth review of top chatbot platforms available in India.' },
            { icon: '✓', title: 'Feature Matrices', description: 'Side-by-side comparison of features like NLP, live handover, and analytics.' },
            { icon: '✓', title: 'Pricing Analysis', description: 'Hidden cost reveals and best value-for-money picks.' },
            { icon: '✓', title: 'WhatsApp vs Website', description: 'Pros and cons of different chatbot channels.' },
            { icon: '✓', title: 'ROI Calculator', description: 'How to calculate the return on investment for your business.' },
            { icon: '✓', title: 'Implementation Guide', description: 'A roadmap to getting your chatbot live in days, not months.' }
        ]
    },
    {
        slug: 'ai-tools-comparison-sheet',
        title: 'AI Tools Comparison Sheet (50 Tools)',
        subtitle: 'Compare features, pricing, and use cases at a glance',
        description: 'A detailed comparison spreadsheet of 50 popular AI tools with pricing features, pros/cons, and recommendations.',
        price_inr: 199,
        original_price_inr: 299,
        product_type: 'sheet',
        features: [
            '50 AI tools compared side-by-side',
            'Pricing in ₹',
            'Feature comparison matrix',
            'Pros and cons for each tool',
            'Best use cases',
            'Editable Google Sheet format'
        ],
        hero_badge: '📊 Data Sheet',
        problem_title: 'Need a Quick Overview?',
        problem_items: [
            { icon: '📝', title: 'Messy Notes', description: 'Trying to keep track of tools in random notes and bookmarks.' },
            { icon: '⚡', title: 'Need Fast Answers', description: 'Wasting time looking up pricing and features for every tool again and again.' }
        ],
        whats_inside_items: [
            { icon: '✓', title: '50 Tools Data', description: 'Structured data for 50 top AI tools.' },
            { icon: '✓', title: 'Feature Matrix', description: 'Easily compare capabilities.' },
            { icon: '✓', title: 'Pricing Columns', description: 'Clear pricing info including free tiers.' },
            { icon: '✓', title: 'Editable Format', description: 'Google Sheet you can copy and customize.' }
        ]
    },

    // 2. Bundles
    {
        slug: 'creator-bundle',
        title: 'Creator AI Bundle',
        subtitle: 'Marketing Guide + Prompt Engineering Guide',
        description: 'The ultimate toolkit for content creators. Master marketing automation and prompt engineering to scale your content production.',
        price_inr: 999,
        original_price_inr: 2198,
        product_type: 'bundle',
        features: [
            'AI for Marketing Guide (₹699 value)',
            'Prompt Engineering Master Guide (₹499 value)',
            'Save ₹199 instantly',
            'Lifetime access to both guides',
            'Bonus: Content Calendar Template'
        ],
        hero_badge: '🎁 Value Bundle',
        problem_title: 'Want the Complete Creator Toolkit?',
        problem_items: [
            { icon: '🚀', title: 'Scale Faster', description: 'Get everything you need to grow your audience.' },
            { icon: '💰', title: 'Save Money', description: 'Get a massive discount by bundling these essential guides.' }
        ],
        whats_inside_items: [
            { icon: '📘', title: 'Marketing Guide', description: 'Full access to the AI for Marketing Playbook.' },
            { icon: '📕', title: 'Prompt Guide', description: 'Full access to the Prompt Engineering Master Guide.' },
            { icon: '🎁', title: 'Bonus Templates', description: 'Exclusive templates for content planning.' }
        ]
    },
    {
        slug: 'business-bundle',
        title: 'Business AI Bundle',
        subtitle: 'Business Guide + Chatbots Report',
        description: 'Streamline your business operations. Get the complete business playbook and the chatbot comparison guide.',
        price_inr: 899,
        original_price_inr: 1698,
        product_type: 'bundle',
        features: [
            'AI for Business Owners Guide (₹599 value)',
            'AI Chatbots Comparison Report (₹399 value)',
            'Save ₹99 instantly',
            'Implementation checklists',
            'Vendor selection framework'
        ],
        hero_badge: '💼 Business Value',
        problem_title: 'Everything Your Business Needs',
        problem_items: [
            { icon: '📈', title: 'Total Optimization', description: 'From internal ops to customer facing chatbots.' },
            { icon: '💰', title: 'Best Value', description: 'Smart savings on the two most critical business resources.' }
        ],
        whats_inside_items: [
            { icon: '📘', title: 'Business Guide', description: 'Complete AI playbook for owners.' },
            { icon: '📊', title: 'Chatbot Report', description: 'Comprehensive chatbot selection guide.' },
            { icon: '✅', title: 'Checklists', description: 'Ready-to-use implementation checklists.' }
        ]
    },
    {
        slug: 'complete-ai-toolkit',
        title: 'Complete AI Toolkit Bundle',
        subtitle: 'Best AI Tools Guide + Comparison Sheet',
        description: 'Get everything you need to choose the right AI tools. Includes the comprehensive guide AND the comparison sheet. Save ₹99 when you buy together.',
        price_inr: 499,
        original_price_inr: 598,
        product_type: 'bundle',
        features: [
            'Best AI Tools Guide (₹399 value)',
            'AI Tools Comparison Sheet (₹199 value)',
            'Save ₹99 instantly',
            'Lifetime access to both',
            'Free updates for 1 year'
        ],
        hero_badge: '🎁 Best Value Bundle',
        problem_title: 'Want the Best of Both Worlds?',
        problem_items: [
            { icon: '📚', title: 'Deep Dive', description: 'Get the detailed guide for in-depth understanding.' },
            { icon: '⚡', title: 'Quick Reference', description: 'Use the spreadsheet for fast comparisons.' }
        ],
        whats_inside_items: [
            { icon: '📘', title: 'Premium Guide', description: 'Full access to the Best AI Tools for Students & Creators guide.' },
            { icon: '📊', title: 'Comparison Sheet', description: 'Full access to the 50-tool comparison spreadsheet.' },
            { icon: '💰', title: 'Big Savings', description: 'Get both for less than the price of buying separately.' }
        ]
    },
    {
        slug: 'all-access-library',
        title: 'All-Access AI Library',
        subtitle: 'Get EVERYTHING: All Guides, Reports & Sheets',
        description: 'The complete AI knowledge base. Get lifetime access to every guide, report, and sheet we publish. The smartest investment for your future.',
        price_inr: 1899,
        original_price_inr: 3995,
        product_type: 'bundle',
        features: [
            'Best AI Tools Guide',
            'AI for Business Owners Guide',
            'AI for Marketing Guide',
            'Prompt Engineering Master Guide',
            'AI Chatbots Comparison',
            'AI Tools Comparison Sheet',
            'Save over ₹1500+',
            'Lifetime updates included'
        ],
        hero_badge: '👑 Ultimate Access',
        problem_title: 'Stop Buying One by One',
        problem_items: [
            { icon: '🧠', title: 'Complete Knowledge', description: 'Never wonder if you\'re missing out on key information.' },
            { icon: '💎', title: 'Best Deal', description: 'The absolute lowest price per guide available.' }
        ],
        whats_inside_items: [
            { icon: '📚', title: 'All 4 Guides', description: 'Business, Marketing, Prompts, and Tools guides.' },
            { icon: '📊', title: 'All Reports & Sheets', description: 'Comparison sheets and specialized reports.' },
            { icon: '🔄', title: 'Lifetime Updates', description: 'Get all future updates for free.' }
        ]
    }
];
