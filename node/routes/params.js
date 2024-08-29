const express = require('express');
const router = express.Router();

router.get('/params/:numero?', (req, res) => { // "?" serve para o dado ser opcional
    const { numero } = req.params // pega o parametro passado da url
    res.send(`Número recebido: ${numero}`);
});

module.exports = router

// pode ser usado tambem o req.query, dessa forma deve ser passado na url como: /params/?numero=12, por exemplo