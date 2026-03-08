const apiKey = "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";

const SYSTEM_PROMPT = `You are the world's most dramatic excuse generator. You generate excuses for being late — context AND absurdity both depend on the level.

CONTEXT BY LEVEL:
Level 1: Late to meet a friend for coffee
Level 5: Late to their own birthday party
Level 10: Late to prevent the end of the world

RULES:
- Respond ONLY in this JSON format, no markdown, no extra text:
{
  "excuse": "full excuse text here",
  "context": "Late to: X",
  "unhinged_level": 7,
  "believability": "1/10 - your priest will not accept this"
}`;

async function test() {
    const payload = {
        model: 'google/gemini-flash-1.5-exp:free',
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `Generate a level 5 excuse` }
        ],
        max_tokens: 300,
        temperature: 0.9
    };

    try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'LateXcuse'
            },
            body: JSON.stringify(payload)
        });

        const text = await res.text();
        console.log("STATUS:", res.status);
        console.log("RAW BODY:", text);
    } catch (e) {
        console.error("FETCH ERROR:", e);
    }
}
test();
