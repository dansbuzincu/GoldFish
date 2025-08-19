const { createServer } = require('node:http');

const everyone = '0.0.0.0';
const port = process.env.PORT || 3000;

const tasks = [];
let nextId = 1;

const server = createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // POST /task  -> add a task
  if (url === '/task' && method === 'POST') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        const json = body ? JSON.parse(body) : {};
        const text = (json.text || '').trim();
        if (!text) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Send JSON like {"text":"..."}' }));
          return;
        }
        const item = { id: nextId++, text, ts: Date.now() };
        tasks.push(item);

        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: true, added: item, total: tasks.length }));
      } catch {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // GET /tasks -> list all
  if (url === '/tasks' && method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ count: tasks.length, tasks }));
    return;
  }

  // everything else
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Not found');
});

server.listen(port, everyone, () => {
  console.log(`Server running at http://${everyone}:${port}/`);
});
