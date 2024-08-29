// Crie uma API com banco de dados para produtos esportivos, inicialmente somente a collection de produtos

const express = require('express');
const router = express.Router();
const Products = require('../models/Products');

router
    .get('/', async (req, res) => {
        try {
            const products = await Products.find();
            return res.status(200).send({ data: products });
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    })

    .get('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const products = await Products.findById(id);
            return res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    })

    .post('/', async (req, res) => {
        const { name, price } = req.body;
        if(!name || !price)
            return res.status(400).send({ message: "Dados inválidos" })

        const product = {
            name: name,
            price: price
        }

        try {
            const p = await Products.create(product);
            return res.status(201).send({ message: "Produto inserido com sucesso", body: p });
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    })

    .patch('/:id', async (req, res) => {
        const { id } = req.params;

        if(!id)
            return res.status(400).send({ message: "No id provider" })

        const product = req.body;

        if(!product.price)
            return res.status(400).send({ message: "No price provider" })

        try {
            const newProduct = await Products.findByIdAndUpdate(
                id,
                { price: product.price }
            );

            return res.status(201).send(newProduct);
        } catch (error) {
            return res.status(500).send({ error: error });
        }
    })

    .delete('/:id', async (req, res) => {
        const { id } = req.params;

        if(!id)
            return res.status(400).send({ message: "No id provider" });

        try {
            await Products.findByIdAndDelete(id);
            return res.status(200).send({ message: "Product deleted successfully" })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Something failled"})
        }
    })

module.exports = router;