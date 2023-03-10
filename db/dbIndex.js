const {Pool} = require('pg');

const db = new Pool({
  user: 'postgres',
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db
  .connect()
  .then(() => {console.log('Connected')})
  .catch((err) => {throw err})

db
  .query(`CREATE TABLE IF NOT EXISTS products (
    product_id integer PRIMARY KEY,
    name varchar(40),
    description varchar(250),
    slogan varchar(500),
    category varchar(50),
    default_price varchar(20)
  );`)
  .then(() => {/*console.log('TABLE "products" created')*/})
  .catch((err) => {throw err})

db
.query(`CREATE TABLE IF NOT EXISTS styles (
  style_id integer PRIMARY KEY,
  product_id integer,
  name varchar(100),
  sale_price varchar(20),
  original_price varchar(20),
  default_style integer
);`)
.then(() => {/*console.log('TABLE "styles" created')*/})
.catch((err) => {throw err})

db
.query(`CREATE TABLE IF NOT EXISTS skus (
  sku_id integer PRIMARY KEY,
  style_id integer,
  size varchar(10),
  quantity integer
);`)
.then(() => {/*console.log('TABLE "skus" created')*/})
.catch((err) => {throw err})

db
.query(`CREATE TABLE IF NOT EXISTS features (
  feature_id integer PRIMARY KEY,
  product_id integer,
  feature varchar(100),
  value varchar(100)
);`)
.then(() => {/*console.log('TABLE "features" created')*/})
.catch((err) => {throw err})

db
.query(`CREATE TABLE IF NOT EXISTS photos (
  photo_id integer PRIMARY KEY,
  style_id integer,
  url varchar,
  thumbnail varchar
);`)
.then(() => {/*console.log('TABLE "photos" created')*/})
.catch((err) => {throw err})

db
.query(`CREATE TABLE IF NOT EXISTS related (
  id integer PRIMARY KEY,
  currentproduct_id integer,
  related_product_id integer
);`)
.then(() => {/*console.log('TABLE "related" created')*/})
.catch((err) => {throw err})

db
.query(`CREATE TABLE IF NOT EXISTS cart (
  id SERIAL PRIMARY KEY,
  user_session varchar,
  sku_id integer,
  count integer
);`)
.then(() => {/*console.log('TABLE "cart" created')*/})
.catch((err) => {throw err})

const dbGetProducts = () => {
  return db.query(
    `SELECT product_id as id, name, slogan, description, category, default_price FROM products LIMIT 5 OFFSET 0;`
  )
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    throw err;
  })
};

const dbGetProductInfo = (productId) => {
  return db.query(
    `SELECT json_build_object(
      'id', ${productId},
      'name', name,
      'slogan', slogan,
      'description', description,
      'category', category,
      'default_price', default_price,
      'features', json_agg(
        json_build_object(
          'feature', feature,
          'value', value)
        )
      ) as product_info FROM products JOIN features ON products.product_id = features.product_id WHERE products.product_id = ${productId} GROUP BY products.product_id;`
  )
  .then((result) => {
    return result.rows[0].product_info;
  })
  .catch((err) => {
    throw err;
  })
};

const dbGetStyles = (productId) => {
  return db.query(
    `SELECT json_build_object(
      'product_id', (SELECT product_id FROM products WHERE product_id = ${productId}),
      'results', json_agg(
        json_build_object(
          'style_id', styles.style_id,
          'name', name,
          'original_price', original_price,
          'sale_price', (SELECT NULLIF(sale_price, 'null')),
          'default?', (SELECT CAST (default_style AS BOOLEAN)),
          'photos', (SELECT json_agg(json_build_object(
              'thumbnail_url', thumbnail,
              'url', url
            )) FROM photos WHERE style_id = styles.style_id),
          'skus', (SELECT json_object_agg(
            sku_id, json_build_object(
              'quantity', quantity,
              'size', size)) FROM skus WHERE style_id = styles.style_id)
          )
          )
        ) as styles_info FROM styles WHERE styles.product_id = ${productId};`
  )
  .then((result) => {
    return result.rows[0].styles_info;
  })
  .catch((err) => {
    throw err;
  })
};

const dbGetRelatedProducts = (productId) => {
  return db.query(
    `SELECT json_agg(related_product_id) as related_products FROM related WHERE currentproduct_id = ${productId};`
  )
  .then((result) => {
    return result.rows[0].related_products;
  })
  .catch((err) => {
    throw err;
  })
};

const dbGetCart = (sessionID) => {
  return db.query(
    `SELECT sku_id, count FROM cart WHERE user_session = '${sessionID}';`
  )
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    throw err;
  })
};

const dbAddToCart = (sessionID, sku_id, count) => {
  return db.query(
    `INSERT INTO cart (user_session, sku_id, count) VALUES ('${sessionID}', ${sku_id}, ${count});`
  )
  .then((result) => {
    return result;
  })
  .catch((err) => {
    throw err;
  })
};

module.exports.db = db;
module.exports.dbGetProducts = dbGetProducts;
module.exports.dbGetProductInfo = dbGetProductInfo;
module.exports.dbGetStyles = dbGetStyles;
module.exports.dbGetRelatedProducts = dbGetRelatedProducts;
module.exports.dbAddToCart = dbAddToCart;
module.exports.dbGetCart = dbGetCart;