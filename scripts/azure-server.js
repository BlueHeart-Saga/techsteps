require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { sendContactEmail } = require('./mail-service.cjs');

const DIST_DIR = fs.existsSync(path.join(__dirname, 'index.html'))
  ? __dirname
  : (fs.existsSync(path.join(__dirname, '../dist/index.html')) ? path.join(__dirname, '../dist') : __dirname);
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

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Canonical sub-service slugs (all 27 end with -services)
const CANONICAL_SERVICE_MAP = {
  // 1. Information Management
  'digital-mailroom': 'digital-mailroom-services',
  'digital-mailroom-services': 'digital-mailroom-services',
  'digital-mailroom-uk': 'digital-mailroom-services',
  'document-management': 'document-management-services',
  'document-management-services': 'document-management-services',
  'document-management-uk': 'document-management-services',
  'document-scanning': 'document-scanning-services',
  'document-scanning-services': 'document-scanning-services',
  'document-scanning-uk': 'document-scanning-services',
  'document-storage': 'document-storage-services',
  'document-storage-services': 'document-storage-services',
  'document-storage-uk': 'document-storage-services',
  'heritage-storage': 'heritage-storage-services',
  'heritage-storage-services': 'heritage-storage-services',
  'heritage-storage-services-uk': 'heritage-storage-services',
  'tape-media-storage': 'tape-media-storage-services',
  'tape-media-storage-services': 'tape-media-storage-services',
  'tape-media-storage-uk': 'tape-media-storage-services',
  'vault-storage': 'vault-storage-services',
  'vault-storage-services': 'vault-storage-services',
  'vault-storage-uk': 'vault-storage-services',

  // 2. IT Lifecycle Services & Destruction
  'it-asset-disposition': 'it-asset-disposition-services',
  'it-asset-disposition-services': 'it-asset-disposition-services',
  'it-asset-disposition-uk': 'it-asset-disposition-services',
  'it-asset-tracking': 'it-asset-tracking-services',
  'it-asset-tracking-services': 'it-asset-tracking-services',
  'it-asset-tracking-uk': 'it-asset-tracking-services',
  'remarketing-recycling': 'remarketing-recycling-services',
  'remarketing-recycling-services': 'remarketing-recycling-services',
  'remarketing-recycling-uk': 'remarketing-recycling-services',
  'secure-collection': 'secure-collection-services',
  'secure-collection-services': 'secure-collection-services',
  'secure-collection-uk': 'secure-collection-services',
  'secure-it-disposal': 'secure-it-disposal-services',
  'secure-it-disposal-services': 'secure-it-disposal-services',
  'secure-it-disposal-uk': 'secure-it-disposal-services',
  'ultra-secure-hard-drive-destruction': 'ultra-secure-hard-drive-destruction-services',
  'ultra-secure-hard-drive-destruction-services': 'ultra-secure-hard-drive-destruction-services',
  'ultra-secure-hard-drive-destruction-uk': 'ultra-secure-hard-drive-destruction-services',

  // 3. Secure Shredding & Document Integrity
  'cardboard-recycling': 'cardboard-recycling-services',
  'cardboard-recycling-services': 'cardboard-recycling-services',
  'cardboard-recycling-uk': 'cardboard-recycling-services',
  'disposal-services': 'disposal-services',
  'disposal-services-uk': 'disposal-services',
  'dry-mixed-recycling': 'dry-mixed-recycling-services',
  'dry-mixed-recycling-services': 'dry-mixed-recycling-services',
  'dry-mixed-recycling-uk': 'dry-mixed-recycling-services',
  'home-shredding': 'home-shredding-services',
  'home-shredding-services': 'home-shredding-services',
  'home-shredding-uk': 'home-shredding-services',
  'off-site-shredding': 'off-site-shredding-services',
  'off-site-shredding-services': 'off-site-shredding-services',
  'off-site-shredding-uk': 'off-site-shredding-services',
  'on-site-shredding': 'on-site-shredding-services',
  'on-site-shredding-services': 'on-site-shredding-services',
  'on-site-shredding-uk': 'on-site-shredding-services',
  'product-shredding': 'product-shredding-services',
  'product-shredding-services': 'product-shredding-services',
  'product-shredding-uk': 'product-shredding-services',
  'simpler-recycling': 'simpler-recycling-services',
  'simpler-recycling-services': 'simpler-recycling-services',
  'simpler-recycling-uk': 'simpler-recycling-services',

  // 4. Moving & Relocation Services
  'business-relocations': 'business-relocations-services',
  'business-relocations-services': 'business-relocations-services',
  'business-relocations-uk': 'business-relocations-services',
  'europe-international-domestic-moves': 'europe-international-domestic-moves-services',
  'europe-international-domestic-moves-services': 'europe-international-domestic-moves-services',
  'europe-international-domestic-moves-uk': 'europe-international-domestic-moves-services',
  'heritage-relocations-storage': 'heritage-relocations-storage-services',
  'heritage-relocations-storage-services': 'heritage-relocations-storage-services',
  'heritage-relocations-storage-uk': 'heritage-relocations-storage-services',
  'it-relocations-specialist': 'it-relocations-specialist-services',
  'it-relocations-specialist-services': 'it-relocations-specialist-services',
  'it-relocations-specialist-uk': 'it-relocations-specialist-services',
  'laboratory-relocations-storage': 'laboratory-relocations-storage-services',
  'laboratory-relocations-storage-services': 'laboratory-relocations-storage-services',
  'laboratory-relocations-storage-uk': 'laboratory-relocations-storage-services',
  'project-management': 'project-management-services',
  'project-management-services': 'project-management-services',
  'project-management-uk': 'project-management-services',
};

function getCanonicalSubService(slug) {
  if (!slug) return null;
  let clean = String(slug).toLowerCase().trim().replace(/^\/+|\/+$/g, '');
  if (CANONICAL_SERVICE_MAP[clean]) {
    return CANONICAL_SERVICE_MAP[clean];
  }
  clean = clean.replace(/-services(-services)+$/, '-services');
  if (clean.endsWith('-services')) {
    const base = clean.slice(0, -9);
    if (CANONICAL_SERVICE_MAP[base]) return CANONICAL_SERVICE_MAP[base];
  } else {
    const withServices = `${clean}-services`;
    if (CANONICAL_SERVICE_MAP[withServices]) return CANONICAL_SERVICE_MAP[withServices];
  }
  return null;
}


// Email handling is provided by ./mail-service.cjs

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

const server = http.createServer((req, res) => {
  let pathname = '';
  let parsedUrl = null;
  try {
    parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
    pathname = decodeURIComponent(parsedUrl.pathname);
  } catch {
    pathname = req.url || '';
  }

  // Canonical HTTP 301 redirects for TechSteps sub-services
  if (pathname.startsWith('/services/')) {
    const trimmed = pathname.replace(/^\/services\//, '').replace(/\/$/, '');
    const parts = trimmed.split('/');
    const search = (parsedUrl && parsedUrl.search) ? parsedUrl.search : '';

    if (parts.length === 1 && parts[0]) {
      const slug = parts[0];
      const canonical = getCanonicalSubService(slug);
      if (canonical && slug !== canonical) {
        res.writeHead(301, {
          'Location': `/services/${canonical}${search}`,
          'Cache-Control': 'public, max-age=31536000',
        });
        res.end();
        return;
      }
    } else if (parts.length === 2 && parts[1]) {
      // Legacy 3-segment route: /services/[division]/[slug]
      const slug = parts[1];
      const canonical = getCanonicalSubService(slug);
      if (canonical) {
        res.writeHead(301, {
          'Location': `/services/${canonical}${search}`,
          'Cache-Control': 'public, max-age=31536000',
        });
        res.end();
        return;
      }
    }
  }

  // =========================================================================
  // API: /api/contact (Supports both Contact Enquiry & Collection Request)
  // =========================================================================
  if (pathname === '/api/contact' || pathname === '/api/contact/' || req.url === '/api/contact') {
    // 1. Handle CORS preflight OPTIONS request
    if (req.method === 'OPTIONS') {
      res.writeHead(204, CORS_HEADERS);
      res.end();
      return;
    }

    // 2. Handle POST request
    if (req.method === 'POST') {
      (async () => {
        try {
          const body = await readRequestBody(req);
          let data;
          try {
            data = JSON.parse(body);
          } catch {
            res.writeHead(400, {
              ...CORS_HEADERS,
              'Content-Type': 'application/json; charset=utf-8',
            });
            res.end(JSON.stringify({
              success: false,
              message: 'Invalid JSON body.',
            }));
            return;
          }

          const isCollection = data.formType === 'collection';

          // Validation
          if (isCollection) {
            if (!data.name || !data.email || !data.phone || !data.address) {
              res.writeHead(400, {
                ...CORS_HEADERS,
                'Content-Type': 'application/json; charset=utf-8',
              });
              res.end(JSON.stringify({
                success: false,
                message: 'Please complete all required fields (Name, Email, Phone, Collection Address).',
              }));
              return;
            }
          } else {
            if (!data.name || !data.email || !data.phone || (!data.subject && !data.message)) {
              res.writeHead(400, {
                ...CORS_HEADERS,
                'Content-Type': 'application/json; charset=utf-8',
              });
              res.end(JSON.stringify({
                success: false,
                message: 'Please complete all required fields.',
              }));
              return;
            }
          }

          const result = await sendContactEmail(data);

          res.writeHead(200, {
            ...CORS_HEADERS,
            'Content-Type': 'application/json; charset=utf-8',
          });

          res.end(JSON.stringify({
            success: true,
            message: isCollection
              ? 'Your collection request has been sent successfully.'
              : 'Your enquiry has been sent successfully.',
            reference: result.reference || data.reference || undefined,
          }));
        } catch (error) {
          console.error('Contact API error:', error);
          console.error('Error message:', error?.message);
          console.error('Error stack:', error?.stack);

          res.writeHead(500, {
            ...CORS_HEADERS,
            'Content-Type': 'application/json; charset=utf-8',
          });

          res.end(JSON.stringify({
            success: false,
            message: error?.message || 'Unable to send your request right now.',
          }));
        }
      })();
      return;
    }

    // Reject other HTTP methods on /api/contact with JSON error
    res.writeHead(405, {
      ...CORS_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
    });
    res.end(JSON.stringify({
      success: false,
      message: 'Method Not Allowed. Please use POST.',
    }));
    return;
  }

  // =========================================================================
  // API: /api/newsletter/subscribe
  // =========================================================================
  if (
    pathname === '/api/newsletter/subscribe' ||
    pathname === '/api/newsletter/subscribe/' ||
    req.url === '/api/newsletter/subscribe'
  ) {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, CORS_HEADERS);
      res.end();
      return;
    }

    if (req.method === 'POST') {
      (async () => {
        try {
          const body = await readRequestBody(req);
          let data;
          try {
            data = JSON.parse(body);
          } catch {
            res.writeHead(400, {
              ...CORS_HEADERS,
              'Content-Type': 'application/json; charset=utf-8',
            });
            res.end(JSON.stringify({
              success: false,
              message: 'Invalid JSON body.',
            }));
            return;
          }

          if (!data.email || !data.email.includes('@')) {
            res.writeHead(400, {
              ...CORS_HEADERS,
              'Content-Type': 'application/json; charset=utf-8',
            });
            res.end(JSON.stringify({
              success: false,
              message: 'Please provide a valid email address.',
            }));
            return;
          }

          console.log(`[Newsletter] Subscribed: ${data.email} (${data.categorySlug || 'general'})`);

          res.writeHead(200, {
            ...CORS_HEADERS,
            'Content-Type': 'application/json; charset=utf-8',
          });
          res.end(JSON.stringify({
            success: true,
            message: 'Successfully subscribed to the newsletter!',
          }));
        } catch (error) {
          console.error('Newsletter API error:', error);
          res.writeHead(500, {
            ...CORS_HEADERS,
            'Content-Type': 'application/json; charset=utf-8',
          });
          res.end(JSON.stringify({
            success: false,
            message: error?.message || 'Unable to subscribe right now.',
          }));
        }
      })();
      return;
    }

    res.writeHead(405, {
      ...CORS_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
    });
    res.end(JSON.stringify({
      success: false,
      message: 'Method Not Allowed. Please use POST.',
    }));
    return;
  }

  // =========================================================================
  // STATIC FILE SERVING
  // =========================================================================
  // Only allow GET and HEAD for static assets
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
