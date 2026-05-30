/**
 * Local development server for StepUp shoe shop.
 * Serves static files AND handles the /api/chat POST endpoint
 * so you can test the AI chat locally without deploying to Vercel.
 *
 * Usage:  node server.js
 * Then open http://localhost:3000 in your browser.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const chatHandler = require('./api/chat');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.md': 'text/markdown',
};

const server = http.createServer(async (req, res) => {
    // ── CORS headers (allow local dev) ──
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // ── API route: /api/chat ──
    if (req.url === '/api/chat') {
        try {
            await chatHandler(req, res);
        } catch (err) {
            console.error('[/api/chat] Error:', err);
            if (!res.headersSent) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Internal server error' }));
            }
        }
        return;
    }

    // ── Static file serving ──
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);

    // Security: prevent directory traversal
    if (!filePath.startsWith(PUBLIC_DIR)) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
    }

    // If path points to a directory, serve index.html inside it
    try {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }
    } catch (_) {
        // file doesn't exist — handled below
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            // SPA fallback: serve index.html for unknown routes
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (fallbackErr, fallbackData) => {
                    if (fallbackErr) {
                        res.statusCode = 404;
                        res.end('Not Found');
                        return;
                    }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(fallbackData);
                });
                return;
            }
            res.statusCode = 500;
            res.end('Server Error');
            return;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`\n  🚀 StepUp dev server running at http://localhost:${PORT}\n`);
});
