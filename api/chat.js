const storeData = require('../store-data.json');

const DEFAULT_MODEL = 'gemini-3.1-flash-lite';
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';
const GEMINI_API_KEY = 'AQ.Ab8RN6L3VzKPU8gDlMakjqAU3_WwUTou-AEP1jKADZEDMr-g2A';

function sendJson(res, statusCode, payload) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(payload));
}

function parseBody(req) {
    if (req.body && typeof req.body === 'object') {
        return Promise.resolve(req.body);
    }

    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk;

            if (body.length > 100000) {
                reject(new Error('Request body too large'));
                req.destroy();
            }
        });

        req.on('end', () => {
            if (!body) {
                resolve({});
                return;
            }

            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });

        req.on('error', reject);
    });
}

function cleanJsonText(text) {
    return String(text || '')
        .trim()
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```$/i, '')
        .trim();
}

function buildPrompt(message, history) {
    const trimmedHistory = Array.isArray(history) ? history.slice(-8) : [];

    return [
        'You are the StepUp AI shopping assistant for a shoe shop in Buea, Cameroon.',
        'Use only the provided STORE_DATA unless the user asks for general shoe-care advice.',
        'If the user asks for products, prices, categories, owner/founder images, store images, policy info, contact info, or reviews, answer from STORE_DATA.',
        'When useful, include product or asset cards in items. Each item should include name/title, description, category when relevant, priceXaf when relevant, and imageUrl or imagePath when available.',
        'Do not invent sizes, stock levels, discounts, or delivery promises not present in STORE_DATA.',
        'For payments, mention MTN Mobile Money and Orange Money only.',
        'If information is unavailable, say so and suggest contacting StepUp.',
        'Return strict JSON only, with this shape:',
        '{"answer":"string","items":[{"name":"string","title":"string","category":"string","priceXaf":0,"description":"string","imageUrl":"string","imagePath":"string"}],"suggestions":["string"]}',
        '',
        `CHAT_HISTORY: ${JSON.stringify(trimmedHistory)}`,
        `USER_MESSAGE: ${message}`,
        `STORE_DATA: ${JSON.stringify(storeData)}`
    ].join('\n');
}

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        sendJson(res, 200, { ok: true });
        return;
    }

    if (req.method !== 'POST') {
        sendJson(res, 405, { error: 'Method not allowed' });
        return;
    }

    const apiKey = GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
        sendJson(res, 503, {
            error: 'Gemini API key is not configured.',
            code: 'missing_gemini_api_key'
        });
        return;
    }

    try {
        const body = await parseBody(req);
        const message = String(body.message || '').trim();

        if (!message) {
            sendJson(res, 400, { error: 'Message is required.' });
            return;
        }

        const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
        const response = await fetch(`${GEMINI_ENDPOINT}/${model}:generateContent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: buildPrompt(message, body.history) }]
                    }
                ],
                generationConfig: {
                    temperature: 0.35,
                    responseMimeType: 'application/json'
                }
            })
        });

        const geminiPayload = await response.json();

        if (!response.ok) {
            sendJson(res, response.status, {
                error: 'Gemini request failed.',
                details: geminiPayload.error || geminiPayload
            });
            return;
        }

        const rawText = (geminiPayload.candidates || [])
            .flatMap(candidate => ((candidate.content || {}).parts || []).map(part => part.text || ''))
            .join('\n');

        let assistantPayload;

        try {
            assistantPayload = JSON.parse(cleanJsonText(rawText));
        } catch (error) {
            assistantPayload = {
                answer: rawText || 'I could not produce a clean answer. Please try again.',
                items: [],
                suggestions: ['Show me sneakers', 'What are your payment methods?', 'How do returns work?']
            };
        }

        sendJson(res, 200, {
            answer: assistantPayload.answer || '',
            items: Array.isArray(assistantPayload.items) ? assistantPayload.items : [],
            suggestions: Array.isArray(assistantPayload.suggestions) ? assistantPayload.suggestions : []
        });
    } catch (error) {
        sendJson(res, 500, {
            error: 'Chat request failed.',
            details: error.message
        });
    }
};
