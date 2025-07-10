// health.js
const http = require('http');

const port = process.env.PORT || 3000;
const options = {
  host: 'localhost',
  port: port,
  timeout: 2000,
  path: '/health'
};

const request = http.request(options, (res) => {
  process.exit(res.statusCode === 200 ? 0 : 1);
});

request.on('error', (err) => {
  console.error('Health check failed:', err);
  process.exit(1);
});

request.end();
