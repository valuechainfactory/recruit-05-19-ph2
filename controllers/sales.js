'use strict';
const Sale = require('./../models').sale;
const db = require('./../models');
//@todo ensure sale reduces the oldest inventory with available stock;
module.exports = {
    create(req, res) {
        return Sale.create(
            {
                quantity: req.body.quantity,
                productId: req.body.productId,
                inventoryId: req.body.inventoryId
            })
            .then(sale => res.status(201).send(sale))
            .catch(error => res.status(401).send(error))
    },
    fetchAll(req, res) {
        return Sale.findAll({
            include: [{
                model: db.product
            }]
        })
            .then(sales => res.status(201).send(sales))
            .catch(error => res.status(401).send(error))
    }
};