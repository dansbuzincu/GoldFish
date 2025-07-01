const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const hostname2 = '54.191.253.12';
const hostname3 = '44.226.122.3';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
