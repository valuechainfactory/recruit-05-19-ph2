'use strict';
const Product = require('./../models').product;

module.exports = {
    create(req, res, io) {
        return Product.create(
            {
                name: req.body.name,
                reorderLevel: req.body.reorderLevel,
                reorderQuantity: req.body.reorderQuantity
            })
            .then(product => {
                io.emit('productAdded');
                return res.status(201).send(product);
            })
            .catch(error => res.status(401).send(error))
    },
    update(req, res, io) {
        return Product.update(
            {
                id: req.body.id,
                name: req.body.name,
                reorderLevel: req.body.reorderLevel,
                reorderQuantity: req.body.reorderQuantity
            })
            .then(product => {
                io.emit('productUpdated');
                return res.status(201).send(product);
            })
            .catch(error => res.status(401).send(error))
    },
    fetchAll(req, res) {
        return Product.findAll()
            .then(products => res.status(201).send(products))
            .catch(error => res.status(401).send(error))
    },

};