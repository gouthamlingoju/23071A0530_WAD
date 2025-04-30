const http = require('http');
const os = require('os');
const path = require('path');
const EventEmitter = require('events');

const hostname = '127.0.0.1';
const port = 3000;

// Create a custom event emitter
const myEmitter = new EventEmitter();
myEmitter.on('requestReceived', (url) => {
    console.log(`Custom Event: Request received for ${url}`);
});

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    myEmitter.emit('requestReceived', req.url);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    if (req.method === 'GET') {
        if (req.url === '/') {
            res.end(`Welcome to the Custom HTTP Server!\nSystem Info: ${os.platform()} (${os.arch()})`);
        } else if (req.url === '/about') {
            res.end(`This is a simple HTTP server created using Node.js.\nServer Path: ${path.resolve(__dirname)}`);
        } else {
            res.statusCode = 404;
            res.end('404 Not Found');
        }
    } else if (req.method === 'POST') {
        if (req.url === '/data') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                console.log(`Received POST data: ${body}`);
                res.end(`Data received: ${body}`);
            });
        } else {
            res.statusCode = 404;
            res.end('404 Not Found');
        }
    } else {
        res.statusCode = 405;
        res.end('Method Not Allowed');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

