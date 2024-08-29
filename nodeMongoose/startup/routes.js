const express = require('express');
const person = require('../routes/person');
const products = require('../routes/desafio2');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/person', person);
    app.use('/api/products', products);
}