const db = require('../db/dbIndex.js');
// const dbGetProducts = require('../db/dbIndex.js').dbGetProducts;
// const dbGetProductInfo = require('../db/dbIndex.js').dbGetProductInfo;
// const dbGetStyles = require('../db/dbIndex.js').dbGetStyles;

module.exports = {
  getProducts: (req, res) => {
    console.log('get products');
  },
  getProductInfo: (req, res) => {
    console.log('get product info');
    db.dbGetProductInfo(req.params.product_id)
    .then((result) => {
      res.send(result.rows[0].product_info);
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
  },
  getCart: (req, res) => {
    console.log('get cart');
  },
  postCart: (req, res) => {
    console.log('post cart');
  }
}