require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const nodemailer = require('nodemailer');

const DIST_DIR = __dirname;
const PORT = process.env.PORT || 8080;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
};

const COMPRESSIBLE = new Set([
  'text/html; charset=utf-8',
  'text/css; charset=utf-8',
  'application/javascript; charset=utf-8',
  'application/json; charset=utf-8',
  'image/svg+xml',
  'application/xml; charset=utf-8',
  'application/manifest+json',
  'text/plain; charset=utf-8',
]);

function resolveFilePath(reqUrl) {
  try {
    const parsedUrl = new URL(reqUrl, `http://localhost:${PORT}`);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // Security: prevent directory traversal
    const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
    let targetPath = path.join(DIST_DIR, safePath);

    // 1. If path exists
    if (fs.existsSync(targetPath)) {
      const stat = fs.statSync(targetPath);
      if (stat.isDirectory()) {
        const indexPath = path.join(targetPath, 'index.html');
        if (fs.existsSync(indexPath)) {
          return indexPath;
        }
      } else {
        return targetPath;
      }
    }

    // 2. Check path + .html (clean URL)
    const htmlPath = targetPath + '.html';
    if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
      return htmlPath;
    }

    // 3. Check path / index.html (in case URL was /about-us without trailing slash)
    const nestedIndexPath = path.join(targetPath, 'index.html');
    if (fs.existsSync(nestedIndexPath) && fs.statSync(nestedIndexPath).isFile()) {
      return nestedIndexPath;
    }

    // 4. SPA Fallback for Sanity Studio (/admin or /studio)
    if (
      pathname === '/admin' || pathname.startsWith('/admin/') ||
      pathname === '/studio' || pathname.startsWith('/studio/')
    ) {
      const adminIndexPath = path.join(DIST_DIR, 'admin', 'index.html');
      if (fs.existsSync(adminIndexPath)) {
        return adminIndexPath;
      }
      const adminHtmlPath = path.join(DIST_DIR, 'admin.html');
      if (fs.existsSync(adminHtmlPath)) {
        return adminHtmlPath;
      }
    }
  } catch (err) {
    console.error('Error resolving file path:', err);
  }

  return null;
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();

      // Prevent excessively large requests
      if (body.length > 100000) {
        req.destroy();
        reject(new Error('Request body too large'));
      }
    });

    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

async function sendContactEmail(data) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.FORM_RECEIVER_EMAIL,
    replyTo: data.email,
    subject: `Techsteps Contact Enquiry - ${data.subject || 'General Enquiry'}`,
    text: `
New Contact Enquiry

Name: ${data.name || ''}
Email: ${data.email || ''}
Telephone: ${data.phone || ''}
Service Required: ${data.subject || ''}

Message:
${data.message || ''}
    `.trim(),
  });
}

const server = http.createServer((req, res) => {
  // Contact form API
  if (req.method === 'POST' && req.url === '/api/contact') {
    (async () => {
      try {
        const body = await readRequestBody(req);
        const data = JSON.parse(body);

        if (!data.name || !data.email || !data.phone || !data.subject || !data.message) {
          res.writeHead(400, {
            'Content-Type': 'application/json; charset=utf-8',
          });
          res.end(JSON.stringify({
            success: false,
            message: 'Please complete all required fields.',
          }));
          return;
        }

        await sendContactEmail(data);

        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
        });

        res.end(JSON.stringify({
          success: true,
          message: 'Your enquiry has been sent successfully.',
        }));
      } catch (error) {
        console.error('Contact form error:', error);

        res.writeHead(500, {
          'Content-Type': 'application/json; charset=utf-8',
        });

        res.end(JSON.stringify({
          success: false,
          message: 'Unable to send your enquiry right now.',
        }));
      }
    })();

    return;
  }
  // Only allow GET and HEAD
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  let filePath = resolveFilePath(req.url);
  let statusCode = 200;

  if (!filePath) {
    const notFoundPath = path.join(DIST_DIR, '404.html');
    if (fs.existsSync(notFoundPath)) {
      filePath = notFoundPath;
      statusCode = 404;
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  const headers = {
    'Content-Type': contentType,
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };

  // Cache headers
  if (req.url.startsWith('/_astro/') || req.url.startsWith('/images/')) {
    headers['Cache-Control'] = 'public, max-age=31536000, immutable';
  } else if (contentType.startsWith('text/html')) {
    headers['Cache-Control'] = 'public, max-age=0, must-revalidate';
  } else {
    headers['Cache-Control'] = 'public, max-age=86400';
  }

  // Compression
  const acceptEncoding = req.headers['accept-encoding'] || '';
  const canCompress = COMPRESSIBLE.has(contentType);

  if (canCompress && acceptEncoding.includes('gzip')) {
    headers['Content-Encoding'] = 'gzip';
    res.writeHead(statusCode, headers);
    if (req.method === 'HEAD') {
      res.end();
      return;
    }
    const rawStream = fs.createReadStream(filePath);
    const gzip = zlib.createGzip();
    rawStream.pipe(gzip).pipe(res);
  } else {
    const stat = fs.statSync(filePath);
    headers['Content-Length'] = stat.size;
    res.writeHead(statusCode, headers);
    if (req.method === 'HEAD') {
      res.end();
      return;
    }
    fs.createReadStream(filePath).pipe(res);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Techsteps Azure production server listening on 0.0.0.0:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
