'use client';

import { useState } from 'react';

type KeywordResult = {
    keyword: string;
    intent: string;
};

export default function KeywordResearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<KeywordResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError('');
        setResults([]);

        try {
            const res = await fetch(`/api/seo/keywords?q=${encodeURIComponent(query)}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to fetch keywords');
            }

            setResults(data.results || []);
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    Keyword Discovery
                </h1>
                <p className="text-gray-400 text-lg">
                    Uncover high-potential keywords and questions your audience is searching for.
                </p>
            </div>

            <div className="bg-[#151b2e] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl mb-12">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter a topic (e.g., 'vegan recipes', 'best ai tools')"
                        className="flex-1 bg-gray-900 border border-gray-700 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl px-8 py-4 hover:shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                    >
                        {loading ? 'Discovering...' : 'Find Keywords'}
                    </button>
                </form>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl mb-8 text-center">
                    {error}
                </div>
            )}

            {results.length > 0 && (
                <div className="animate-fade-in-up">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">
                            Results found: <span className="text-purple-400">{results.length}</span>
                        </h2>
                        <div className="text-sm text-gray-500 italic">
                            * Volume data not available in free version
                        </div>
                    </div>

                    <div className="bg-[#151b2e] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-900/50 border-b border-gray-800">
                                        <th className="p-5 font-semibold text-gray-400 w-2/3">Keyword</th>
                                        <th className="p-5 font-semibold text-gray-400 w-1/3">Search Intent</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {results.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-800/30 transition-colors"
                                        >
                                            <td className="p-5 text-gray-200">{item.keyword}</td>
                                            <td className="p-5">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${item.intent === 'Transactional'
                                                        ? 'bg-green-500/10 text-green-400 border-green-500/30'
                                                        : item.intent === 'Commercial'
                                                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                                                            : item.intent === 'Informational'
                                                                ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                                                                : 'bg-gray-500/10 text-gray-400 border-gray-500/30'
                                                    }`}>
                                                    {item.intent}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
