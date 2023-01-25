const dbGetProducts = require('../db/dbIndex.js').dbGetProducts;

module.exports = {
  getProducts: (req, res) => {
    console.log('get products');
  },
  getProductInfo: (req, res) => {
    console.log('get product info');
    dbGetProducts(req.params.product_id)
    .then((result) => {
      res.send(result.rows[0].product_info);
    })
  },
  getStyles: (req, res) => {
    console.log('get styles');
  },
  getRelatedProducts: (req, res) => {
    console.log('get related products');
  },
  getCart: (req, res) => {
    console.log('get cart');
  },
  postCart: (req, res) => {
    console.log('post cart');
  }
}