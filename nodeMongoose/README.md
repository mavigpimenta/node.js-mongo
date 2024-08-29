# index.js

const express = require('express');
const router = require('./routes');
const app = express();

require('../nodeMongoose/startup/db')();

router(app);

const port = 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;

# db.js

const mongoose = require('mongoose');
const config = require('config')

module.exports = function() {
    const db = config.get('db');
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`connected to ${db}`));
}

# default.json

{
    "db": "mongodb://127.0.0.1:27017/nome_database
}
