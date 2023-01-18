const {Client} = require('pg');

const db = new Client({
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
    description varchar(100),
    slogan varchar(250),
    category varchar(50),
    default_price varchar(20)
  );`)
  .then(() => {console.log('TABLE created')})
  .catch((err) => {console.log(err)})
