'use strict';
const Product = require('./../models').product;

module.exports = {
    create(req, res) {
        return Product.create(
            {
                name: req.body.name,
                reorderLevel: req.body.reorderLevel,
                reorderQuantity: req.body.reorderQuantity
            })
            .then(product => res.status(201).send(product))
            .catch(error => res.status(401).send(error))
    },
    update(req, res) {
        return Product.update(
            {
                id: req.body.id,
                name: req.body.name,
                reorderLevel: req.body.reorderLevel,
                reorderQuantity: req.body.reorderQuantity
            })
            .then(product => res.status(201).send(product))
            .catch(error => res.status(401).send(error))
    }
};