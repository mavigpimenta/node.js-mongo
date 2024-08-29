const express = require('express');
const router = express.Router();
const people = [];

router
    .post('/api/person', (req, res) => { // post enviando dados pelo body
        const { name, lastname, salary } = req.body;
        const person = {
            id: people.length,
            name: name,
            lastname: lastname,
            salary: salary
        }

        people.push(person); // armazenando os dados na lista

        if(!name || !lastname || !salary)
            return res.status(400).send({ message: "Dados inválidos" }) // caso algum dado esteja vazio, retorna erro

        return res.status(201).send({ message: "Pessoa inserida com sucesso" });
    })

    .get('/api/person', (req, res) => {
        if(people.length == 0)
            return res.status(500).send({ message: "Não há pessoas inseridas" })
        return res.status(200).send({ data: people }); // retornando a lista inteira 
    })

module.exports = router;

// STATUS CODE
    // Informational responses ( 100 – 199 )
    // Successful responses ( 200 – 299 )
    // Redirection messages ( 300 – 399 )
    // Client error responses ( 400 – 499 )
    // Server error responses ( 500 – 599 )