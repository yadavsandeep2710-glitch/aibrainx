import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // Simulate AI processing delay
        // In production, integrate with OpenAI or Gemini here
        // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        // ...

        await new Promise(resolve => setTimeout(resolve, 1000));

        let response = "I'm an AI SEO Assistant. I can help you with keyword research, content optimization, and technical SEO queries.";

        const lowerMsg = message.toLowerCase();
        if (lowerMsg.includes('optimize') || lowerMsg.includes('improve')) {
            response = "To optimize your content, focus on: \n1. Primary keyword in H1 and first 100 words.\n2. Use LSI keywords naturally.\n3. Ensure fast page load speed (check our Audit tool).\n4. Add internal links to relevant pages.";
        } else if (lowerMsg.includes('keyword')) {
            response = "For keyword research, look for high-volume, low-competition terms. Use our Keyword Discovery tool to find questions your audience is asking. Long-tail keywords often convert better!";
        } else if (lowerMsg.includes('title') || lowerMsg.includes('meta')) {
            response = "Your title tag should be under 60 characters and include your main keyword. The meta description should be under 160 characters and act as a compelling ad copy to improve CTR.";
        } else if (lowerMsg.includes('backlink')) {
            response = "Backlinks are vote of confidence. Focus on quality over quantity. Guest posting, creating linkable assets (like infographics), and digital PR are great strategies.";
        }

        return NextResponse.json({ role: 'assistant', content: response });

    } catch (error) {
        console.error('AI Assistant API Error:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
