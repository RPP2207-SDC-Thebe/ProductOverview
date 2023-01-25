
module.exports = {
  getProducts: (req, res) => {
    console.log('get products');
    res.end();
  },
  getProductInfo: (req, res) => {
    console.log('get product info');
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