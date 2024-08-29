const express = require('express');
const router = require('./routes');
const app = express();

require('../nodeMongoose/startup/db')();

router(app);

const port = 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;

// GET
    // Pode passa ou não um ID, serve para buscar dados
// POST
    // Normalmente usado sem passagem de parâmetro, passa informações via body
// DELETE
    // Usado para remover um dado, passado id como parâmetro
// PUT
    // Usado para atualizar um dado, atualiza totalmente os dados, ou seja, perde os dados que não forem passados, passando id como parâmetro e as informações via body
// PATCH
    // Usado para editar um dado, mas só atualiza os dados que forem passados, não perdendo as outras informações, passando id como parâmetro e as informações via body.