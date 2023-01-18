require('dotenv').config();
const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

app.listen(3000);
console.log('Listening at http://localhost:3000');