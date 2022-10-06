const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware')
const cors = require('cors')

// Create Express Server
const app = express();

// Configuration
const PORT = 3002;
const HOST = "localhost";
const API_SERVICE_URL = "https://timeapi.io";


app.use(morgan('dev'));

app.use(cors())


app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
});

app.use("", createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
}));

// Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});