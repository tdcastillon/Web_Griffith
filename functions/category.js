const express = require('express');
const Category = require('../models/category.model');

let category = express.Router();

category.put('/', async (req, res) => {
    const {name} = req.body;

    try {
    
        const newCategory = await Category.create({
            name
        });
        res.status(201).send(newCategory);
    
    } catch (e) {
        res.status(500).send(e);

    }
})

module.exports = category;