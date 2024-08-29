const express = require('express');
const AuthController = require('../../node.js-mongo/controller/AuthController');
const router = express.Router();

router
    .post('/register', AuthController.register)
    .post('/login', AuthController.login)
    .delete('/delete/:id', AuthController.delete)
    .get('/', AuthController.getAll)
module.exports = router;