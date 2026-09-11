import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
  const parsedUrl = new URL(reqUrl, `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Security: prevent directory traversal
  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let targetPath = path.join(DIST_DIR, safePath);

  // 1. If path is a directory or ends with slash, check index.html
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

  return null;
}

const server = http.createServer((req, res) => {
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

server.listen(PORT, () => {
  console.log(`Techsteps Azure production server listening on port ${PORT}`);
});
