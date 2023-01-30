require('dotenv').config();
const express = require('express');
const session = require('express-session');
const route = require('./routes.js');
// const db = require('../db/dbIndex.js');

const app = express();
app.use(express.json());
app.use(session({
  secret: process.env.SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));



//Product overview Routes

//GET/products (default parameters page and count is 1 and 5)
app.get('/products', route.getProducts);
//GET/products/:product_id
app.get('/products/:product_id', route.getProductInfo);
//GET/products/:product_id/styles (includes photos and skus)
app.get('/products/:product_id/styles', route.getStyles);
//GET/products/:product_id/related
app.get('/products/:product_id/related', route.getRelatedProducts);


//Cart routes

//GET /cart
app.get('/cart', route.getCart);
//POST /cart
app.post('/cart', route.postCart);


app.listen(8080);
console.log('Listening at http://localhost:8080');
