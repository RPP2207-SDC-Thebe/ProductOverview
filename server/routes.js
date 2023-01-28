const db = require('../db/dbIndex.js');

//handle errors properly

module.exports = {
  getProducts: (req, res) => {
    console.log('get products');
    db.dbGetProducts()
    .then((result) => {
      res.send(result);
    })
  },
  getProductInfo: (req, res) => {
    console.log('get product info');
    db.dbGetProductInfo(req.params.product_id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
  },
  getStyles: (req, res) => {
    console.log('get styles');
    db.dbGetStyles(req.params.product_id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
  },
  getRelatedProducts: (req, res) => {
    console.log('get related products');
    db.dbGetRelatedProducts(req.params.product_id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
  },
  getCart: (req, res) => {
    console.log('get cart');
  },
  postCart: (req, res) => {
    console.log('post cart');
  }
}