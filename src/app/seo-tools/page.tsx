import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI SEO Tools | SEOBrain AI',
    description: 'Free AI-powered SEO tools to boost your ranking. Keyword research, site audit, rank tracking, and more.',
};

const tools = [
    {
        title: 'Website SEO Audit',
        description: 'Get a comprehensive SEO score and actionable fix list using Lighthouse & AI.',
        href: '/seo-tools/seo-audit',
        icon: '📊',
        color: 'from-blue-500 to-cyan-500',
    },
    {
        title: 'Keyword Discovery',
        description: 'Find long-tail keywords and questions your audience is asking.',
        href: '/seo-tools/keyword-research',
        icon: '🔍',
        color: 'from-purple-500 to-pink-500',
    },
    {
        title: 'Rank Tracker',
        description: 'Track your keyword positions on Google Search results.',
        href: '/seo-tools/rank-tracker',
        icon: '📈',
        color: 'from-green-500 to-emerald-500',
    },
    {
        title: 'Search Console Insights',
        description: 'Visualize your GSC data with AI-powered explanations.',
        href: '/seo-tools/search-console',
        icon: '🚀',
        color: 'from-orange-500 to-red-500',
    },
    {
        title: 'AI SEO Assistant',
        description: 'Chat with our AI to solve your specific SEO problems.',
        href: '/seo-tools/ai-seo-assistant',
        icon: '🤖',
        color: 'from-indigo-500 to-violet-500',
    },
];

export default function SeoToolsPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    SEOBrain AI Tools
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Powerful, free AI-driven SEO tools designed to help beginners and pros alike dominate search rankings.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tools.map((tool) => (
                    <Link
                        key={tool.href}
                        href={tool.href}
                        className="group relative bg-[#151b2e] border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 block"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-4xl">{tool.icon}</span>
                            <span className="text-gray-500 group-hover:text-white transition-colors">
                                →
                            </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                            {tool.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {tool.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
