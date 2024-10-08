const express = require('express');
const auth = require('../routes/auth');

module.exports = function(app) {
    app
        .use(express.json())
        .use('/api/auth', auth)
}