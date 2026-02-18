'use client';

import { useState } from 'react';

type RankResult = {
    keyword: string;
    rank: number;
    change: number;
    url: string;
};

export default function RankTrackerPage() {
    const [domain, setDomain] = useState('');
    const [keywords, setKeywords] = useState('');
    const [results, setResults] = useState<RankResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!domain || !keywords) return;

        setLoading(true);
        setHasSearched(false);

        // Simulate API delay
        setTimeout(() => {
            const keywordList = keywords.split(',').map(k => k.trim()).filter(k => k);
            const mockResults: RankResult[] = keywordList.map(k => ({
                keyword: k,
                rank: Math.floor(Math.random() * 50) + 1,
                change: Math.floor(Math.random() * 10) - 5,
                url: `https://${domain}/page-${Math.floor(Math.random() * 100)}`
            }));

            setResults(mockResults);
            setLoading(false);
            setHasSearched(true);
        }, 2000);
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                    Rank Tracker
                </h1>
                <p className="text-gray-400 text-lg">
                    Check where your pages rank on Google for specific keywords.
                </p>
            </div>

            <div className="bg-[#151b2e] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl mb-12">
                <form onSubmit={handleCheck} className="space-y-6">
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">Target Domain</label>
                        <input
                            type="text"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            placeholder="example.com"
                            className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">Keywords (comma separated)</label>
                        <textarea
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="seo tools, ai writer, best ranking software"
                            rows={3}
                            className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl px-8 py-4 hover:shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                    >
                        {loading ? 'Analyzing Rankings...' : 'Check Rankings'}
                    </button>
                </form>
            </div>

            {hasSearched && (
                <div className="animate-fade-in-up">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">Tracking Report</h2>
                        <div className="text-sm text-gray-500 italic">
                            * Showing simulated data (configure API for real data)
                        </div>
                    </div>

                    <div className="bg-[#151b2e] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-900/50 border-b border-gray-800">
                                    <th className="p-5 font-semibold text-gray-400">Keyword</th>
                                    <th className="p-5 font-semibold text-gray-400">Rank</th>
                                    <th className="p-5 font-semibold text-gray-400">Change</th>
                                    <th className="p-5 font-semibold text-gray-400 hidden md:table-cell">URL</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {results.map((r, i) => (
                                    <tr key={i} className="hover:bg-gray-800/30 transition-colors">
                                        <td className="p-5 font-medium text-white">{r.keyword}</td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-2xl font-bold ${r.rank <= 3 ? 'text-yellow-400' : r.rank <= 10 ? 'text-white' : 'text-gray-500'}`}>
                                                    {r.rank}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <span className={`flex items-center gap-1 ${r.change > 0 ? 'text-green-400' : r.change < 0 ? 'text-red-400' : 'text-gray-500'}`}>
                                                {r.change > 0 ? '↑' : r.change < 0 ? '↓' : '-'} {Math.abs(r.change)}
                                            </span>
                                        </td>
                                        <td className="p-5 text-sm text-gray-500 hidden md:table-cell truncate max-w-xs block">
                                            <a href={r.url} target="_blank" className="hover:text-green-400 transition-colors">{r.url}</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
    );
}
