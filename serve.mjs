// Servidor local mínimo para probar /dist con URLs limpias. Uso: npm run dev
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp4': 'video/mp4', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml' };
const port = process.env.PORT || 4321;
createServer(async (req, res) => {
  let p = join('dist', decodeURIComponent(new URL(req.url, 'http://x').pathname));
  try { if ((await stat(p)).isDirectory()) p = join(p, 'index.html'); } catch { p = (await stat(p + '.html').catch(() => 0)) ? p + '.html' : p; }
  try {
    const body = await readFile(p);
    const range = req.headers.range;
    if (range && extname(p) === '.mp4') {
      const [s, e] = range.replace('bytes=', '').split('-').map(Number);
      const end = e || body.length - 1;
      res.writeHead(206, { 'Content-Type': 'video/mp4', 'Content-Range': `bytes ${s}-${end}/${body.length}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - s + 1 });
      return res.end(body.subarray(s, end + 1));
    }
    res.writeHead(200, { 'Content-Type': types[extname(p)] || 'application/octet-stream' }).end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': types['.html'] }).end(await readFile('dist/404.html'));
  }
}).listen(port, () => console.log(`→ http://localhost:${port}`));
