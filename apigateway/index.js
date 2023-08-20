const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 8000;
const HOST = "localhost";
const CUSTOMER_SERVICE_URL = "http://127.0.0.1:3000";

const RESTAURANT_SERVICE_URL = "http://127.0.0.1:3001";

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
   res.send('This is a API Gateway for Food Delivery APP');
});


// Authorization
app.use('', (req, res, next) => {
   if (req.headers.authorization) {
    var authheader=req.headers.authorization;
    // Decrypt the user name and the password
    var auth = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
  
    // Checking the details
    if (user == 'user1' && pass == 'pass1') {
      console.log('Auth of user1 successfull');
      next();
    } else {
        res.sendStatus(401);
    }
   } else {
       res.sendStatus(403);
   }
});


// Proxy endpoints for customer
app.use('/customer', createProxyMiddleware({
   target: CUSTOMER_SERVICE_URL,
   changeOrigin: true,
   pathRewrite: {
       [`^/customer`]: '/',
   },
}));

// Proxy endpoints for restaurant
app.use('/restaurant', createProxyMiddleware({
   target: RESTAURANT_SERVICE_URL,
   changeOrigin: true,
   pathRewrite: {
       [`^/restaurant`]: '/',
   },
}));

// Start the Proxy
app.listen(PORT, HOST, () => {
   console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

