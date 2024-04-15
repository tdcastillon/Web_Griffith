const express = require('express');
const Article = require('../models/article.model');
const Category = require('../models/category.model');

let post = express.Router();

post.post('/', async (req, res) => {
    try {
        let category = await Category.findOne({
            where: {
                id: Number(req.body.category)
            }
        })
    
        if (!category) return res.status(404).send('Category not found')
    
        let post = await Article.create({
            title: req.body.title,
            subTitle: req.body.subtitle,
            content: req.body.content,
            head_picture: req.body.image,
            category: category.name,
            author: req.session.user.username
        })
    
        if (!post) return res.status(500).send('An error occured while creating the post')

        res.redirect('/')
    } catch (e) {
        res.status(404).send(e.message)
    }

})

post.post('/edit/:id', async (req, res) => {
    try {

        let category = await Category.findOne({
            where: {
                id: Number(req.body.category)
            }
        })
    
        if (!category) return res.status(404).send('Category not found')

        let post = await Article.update({
            title: req.body.title,
            subTitle: req.body.subtitle,
            content: req.body.content,
            head_picture: req.body.image,
            category: category.name
        }, {
            where: {
                id: req.params.id
            }
        })
    
        if (!post) return res.status(500).send('An error occured while editing the post')

        res.redirect('/')
    } catch (e) {
        res.status(404).send(e.message)
    }
})


module.exports = post;