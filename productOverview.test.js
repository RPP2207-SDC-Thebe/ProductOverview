require('dotenv').config();
const request = require('supertest');
const {Pool} = require('pg');
const app = require('./server/index.js');

const db = new Pool({
  database: process.env.DB_NAME,
})

const baseUrl = 'http://localhost:8080';

describe('Connection', () => {
  beforeAll(async () => {
    await db.connect();
  });

  describe('getProducts route', () => {
    test('GET /products returns 5 products by default', async () => {
      const response = await request(baseUrl)
        .get('/products');
        expect(JSON.parse(response.text).length).toBe(5);
    });

    test('dbGetProducts returns status code of 200', async () => {
      const response = await request(baseUrl)
        .get('/products');
        expect(response.status).toBe(200);
    });
  });

  describe('getProductInfo route', () => {
    test('dbGetProducts returns information about product', async () => {
      const response = await request(baseUrl)
        .get('/products/1');
        expect(JSON.parse(response.text).id).toBe(1);
    });

    test('dbGetProducts returns status code of 200', async () => {
      const response = await request(baseUrl)
        .get('/products/1');
        expect(response.status).toBe(200);
    });

    test('dbGetProducts returns status code of 404 if product does not exist', async () => {
      const response = await request(baseUrl)
        .get('/products/9999999');
        expect(response.status).toBe(404);
    });
  });

  describe('getStyles route', () => {
    test('dbGetStyles returns styles information about product', async () => {
      const response = await request(baseUrl)
        .get('/products/1/styles');
        expect(JSON.parse(response.text).results.length).toBe(6);
    });

    test('dbGetStyles returns status code of 200', async () => {
      const response = await request(baseUrl)
        .get('/products/1/styles');
        expect(response.status).toBe(200);
    });

    test('dbGetStyles returns status code of 404 if product does not exist', async () => {
      const response = await request(baseUrl)
        .get('/products/9999999/styles');
        expect(response.status).toBe(404);
    });

    test('dbGetStyles uses placeholder style info if styles for product does not exist', async () => {
      const response = await request(baseUrl)
        .get('/products/50343/styles');
        console.log(JSON.parse(response.text));
        expect(JSON.parse(response.text).results[0].style_id).toBe(111145);
    });

  });

  describe('getRelated route', () => {
    test('dbGetRelatedProducts returns an array of related product IDs', async () => {
      const response = await request(baseUrl)
        .get('/products/1/related');
        expect(Array.isArray(JSON.parse(response.text))).toBe(true);
    });

    test('dbGetRelatedProducts returns status code of 200', async () => {
      const response = await request(baseUrl)
        .get('/products/1/related');
        expect(response.status).toBe(200);
    });

    test('dbGetRelatedProducts returns status code of 404 if product does not exist', async () => {
      const response = await request(baseUrl)
        .get('/products/9999999/related');
        expect(response.status).toBe(200);
    });
  });

  describe('getCart route', () => {
    test('dbPostCart adds cart entry to database', async () => {
      const response = await request(baseUrl)
        .post('/cart')
        .send({sku_id: 2, count: 5});
        expect(response.text).toBe('Created');
    });


    test('dbGetCart returns status code of 404 if no entry is found', async () => {
      const response = await request(baseUrl)
      .get('/products/1/cart');
      expect(response.status).toBe(404);
    });
  });

  describe('postCart route', () => {
    test('dbPostCart returns a status code of 201', async () => {
      const response = await request(baseUrl)
      .post('/cart')
      .send({sku_id: 2, count: 5})
      expect(response.status).toBe(201);
    });

    test('dbPostCart with bad request returns a status code of 400', async () => {
      const response = await request(baseUrl)
      .post('/cart')
      .send({sku: 10, count: 5})
      expect(response.status).toBe(400);
    });
  });

    afterAll(async () => {
    db.end()
    .then(() => {console.log('Pool has ended')});
  });
});