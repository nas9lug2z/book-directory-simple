const express = require('express');
const booksRouter = require('./routes/booksRouter');

const app = express();

//midlleware to parse req.body
app.use(express.json());

//Routers
app.use('/api/v1/books', booksRouter);

module.exports = app;
