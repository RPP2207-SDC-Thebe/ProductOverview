const db = require('../db/dbIndex.js');

//handle errors properly

module.exports = {
  getProducts: (req, res) => {
    db.dbGetProducts()
    .then((result) => {
      res.send(result);
    })
  },
  getProductInfo: (req, res) => {
    db.dbGetProductInfo(req.params.product_id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
  },
  getStyles: (req, res) => {
    db.dbGetStyles(req.params.product_id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
  },
  getRelatedProducts: (req, res) => {
    db.dbGetRelatedProducts(req.params.product_id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
  },
  getCart: (req, res) => {
    db.dbGetCart(req.sessionID)
    .then((result) => {
      res.send(result);
    })

  },
  postCart: (req, res) => {
    let session = req.sessionID;
    let skuID = req.body.sku_id;
    let count = req.body.count;
    db.dbAddToCart(session, skuID, count)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}