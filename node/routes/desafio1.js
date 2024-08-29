// crie uma API para carros, crie os métodos get, post, get por ID, put e delete

const express = require('express');
const router = express.Router();
const cars = [];

router 
    .post('/cars', (req, res) => {
        const { model, year } = req.body;
        const car = {
            id: cars.length,
            model: model,
            year: year
        };

        cars.push(car);

        if (!model || !year)
            return res.status(400).send({ message: 'Invalid data!' }); 

        return res.status(201).send({ message: 'Car registered with sucessfuly!' });
    })

    .get('/cars', (req, res) => {
        if(cars.length == 0)
            return res.status(500).send({ message: "Cars is empty" });
        return res.status(200).send({ data: cars }); // retornando a lista inteira 
    })

    .put('/cars/:id', (req, res) => {
        const { model, year } = req.body;
        const { id } = req.params;
        
        if(cars.length < id)
            return res.status(400).send({ message: "Invalid ID!" });
        
        cars[id].model = model;
        cars[id].year = year;

        return res.status(201).send({ message: 'Car edited with sucessfuly!' });
    })

    .delete('/cars/:id', (req, res) => {
        const { id } = req.params;

        if(cars.length < id)
            return res.status(400).send({ message: "Invalid ID!" });
        
        cars.splice(id, 1);

        return res.status(201).send({ messag: 'Car deleted with sucessfuly!' });
    })

module.exports = router