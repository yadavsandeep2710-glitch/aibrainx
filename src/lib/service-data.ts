export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
    bestFor: string;
    pricingNote?: string;
    link: string;
}

export interface Package {
    id: string;
    name: string;
    price: string;
    features: string[];
    bestFor: string;
    popular?: boolean;
}

export const services: Service[] = [
    {
        id: 'web-design',
        title: 'Affordable Website Design Services',
        description: 'Professional, mobile-responsive, and SEO-friendly website design tailored for your business needs. We create stunning digital experiences that convert visitors into customers.',
        icon: '🎨',
        features: [
            'Business Website Design',
            'Portfolio Website Design',
            'E-commerce Website Design',
            'Landing Page Design',
            'Website Redesign',
            'Mobile-Responsive Design'
        ],
        bestFor: 'Small businesses, startups, freelancers',
        pricingNote: 'Affordable & budget-friendly',
        link: '#' // To be linked to specific page if created later
    },
    {
        id: 'web-hosting',
        title: 'Low-Cost Web Hosting Services',
        description: 'Reliable, secure, and fast hosting solutions optimized for performance in India. Experience maximum uptime with our beginner-friendly hosting plans.',
        icon: '☁️',
        features: [
            'Shared Hosting',
            'Cloud Hosting',
            'WordPress Hosting',
            'SSL Certificate',
            'Daily Backup',
            'Website Migration'
        ],
        bestFor: 'Beginners, personal blogs, business sites',
        pricingNote: 'Secure & reliable',
        link: '#'
    },
    {
        id: 'domain-essentials',
        title: 'Domain & Website Essentials',
        description: 'Everything you need to establish your brand identity online. From securing your perfect domain name to setting up professional business emails.',
        icon: '🌐',
        features: [
            'Domain Registration',
            'Domain Renewal',
            'Business Email',
            'DNS Management',
            'Whois Privacy',
            'Domain Transfer'
        ],
        bestFor: 'New businesses establishing brand identity',
        link: '#'
    },
    {
        id: 'website-maintenance',
        title: 'Website Maintenance & Support',
        description: 'Keep your website running smoothly with our proactive maintenance services. We handle updates, security, and performance so you can focus on your business.',
        icon: '🛠️',
        features: [
            'Monthly Maintenance',
            'Bug Fixing',
            'Speed Optimization',
            'Security Monitoring',
            'Content Updates',
            'Plugin Updates'
        ],
        bestFor: 'Existing website owners',
        link: '#'
    }
];

export const packages: Package[] = [
    {
        id: 'starter',
        name: 'Starter Package',
        price: 'Contact for Price',
        features: [
            'Website Design (5 Pages)',
            '1 Year Free Hosting',
            'Free SSL Certificate',
            'Mobile Responsive',
            'Basic SEO Setup',
            'Social Media Integration'
        ],
        bestFor: 'New businesses'
    },
    {
        id: 'business',
        name: 'Business Package',
        price: 'Contact for Price',
        features: [
            'Website Design (10 Pages)',
            'Advanced SEO Services',
            'Fast Cloud Hosting',
            'Monthly Maintenance',
            'Business Email Setup',
            'Google My Business Setup'
        ],
        bestFor: 'Local businesses in Indore',
        popular: true
    },
    {
        id: 'growth',
        name: 'Growth Package',
        price: 'Contact for Price',
        features: [
            'E-commerce / Custom Web App',
            'Premium SEO Strategy',
            'Speed & Security Optimization',
            'Priority Support',
            'Content Marketing Strategy',
            'Analytics Dashboard'
        ],
        bestFor: 'Scaling startups'
    }
];
