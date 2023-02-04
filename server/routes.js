const db = require('../db/dbIndex.js');
const placeholderStyle = require('../placeholderStyle.js').placeholderStyle;

//handle errors properly

module.exports = {
  getProducts: (req, res) => {
    db.dbGetProducts()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    })
  },
  getProductInfo: (req, res) => {
    db.dbGetProductInfo(req.params.product_id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    })
  },
  getStyles: (req, res) => {
    db.dbGetStyles(req.params.product_id)
    .then((result) => {
      if (result.product_id === null) {
        throw new Error('product does not exist');
      }
      if (result.results === null) {
        result.results = [placeholderStyle];
      }
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    })
  },
  getRelatedProducts: (req, res) => {
    db.dbGetRelatedProducts(req.params.product_id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    })
  },
  getCart: (req, res) => {
    db.dbGetCart(req.sessionID)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(404).send(err);
    })
  },
  postCart: (req, res) => {
    let session = req.sessionID;
    let skuID = req.body.sku_id;
    let count = req.body.count;
    db.dbAddToCart(session, skuID, count)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
  }
}