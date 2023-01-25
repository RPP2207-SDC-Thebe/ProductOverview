const {Pool} = require('pg');

const db = new Pool({
  database: process.env.DB_NAME,
})

db
  .connect()
  .then(() => {console.log('Connected')})
  .catch((err) => {console.log(err)})

db
  .query(`CREATE TABLE IF NOT EXISTS products (
    product_id integer PRIMARY KEY,
    name varchar(40),
    description varchar(250),
    slogan varchar(500),
    category varchar(50),
    default_price varchar(20)
  );`)
  .then(() => {console.log('TABLE "products" created')})
  .catch((err) => {console.log(err)})

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
.catch((err) => {console.log(err)})

db
.query(`CREATE TABLE IF NOT EXISTS skus (
  sku_id integer PRIMARY KEY,
  style_id integer,
  size varchar(10),
  quantity integer
);`)
.then(() => {/*console.log('TABLE "skus" created')*/})
.catch((err) => {console.log(err)})

db
.query(`CREATE TABLE IF NOT EXISTS features (
  feature_id integer PRIMARY KEY,
  product_id integer,
  feature varchar(100),
  value varchar(100)
);`)
.then(() => {/*console.log('TABLE "features" created')*/})
.catch((err) => {console.log(err)})

db
.query(`CREATE TABLE IF NOT EXISTS photos (
  photo_id integer PRIMARY KEY,
  style_id integer,
  url varchar,
  thumbnail varchar
);`)
.then(() => {/*console.log('TABLE "photos" created')*/})
.catch((err) => {console.log(err)})

db
.query(`CREATE TABLE IF NOT EXISTS related (
  id integer PRIMARY KEY,
  currentproduct_id integer,
  related_product_id integer
);`)
.then(() => {/*console.log('TABLE "related" created')*/})
.catch((err) => {console.log(err)})

//Indexing

// CREATE INDEX feature_id_index ON features (feature_id);
// CREATE INDEX feature_product_id_index ON features (product_id);
// CREATE INDEX photo_id_index ON photos (photo_id);
// CREATE INDEX photo_style_id_index ON photos (style_id);
// CREATE INDEX product_id_index ON products (product_id);
// CREATE INDEX style_id_index ON styles (style_id);
// CREATE INDEX style_product_id_index ON styles (product_id);
// CREATE INDEX sku_id_index ON skus (sku_id);
// CREATE INDEX sku_style_id_index ON skus (style_id);