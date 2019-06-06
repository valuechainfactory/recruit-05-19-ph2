'use strict';
const purchaseOrder = require('./../models').purchaseOrder;
const db = require('./../models');
module.exports = {
    create(req, res) {
        return purchaseOrder.create(
            {
                orderQuantity: req.body.orderQuantity,
                productId: req.body.productId
            })
            .then(purchaseOrder => res.status(201).send(purchaseOrder))
            .catch(error => res.status(401).send(error))
    },
    update(req, res) {
        return purchaseOrder.findOne({where: {id: req.body.id}}).then(order =>
            order.update(
                {
                    processed: req.body.processed
                })
                .then(purchaseOrder => res.status(201).send(purchaseOrder))
                .catch(error => res.status(401).send(error))
        )


    },
    fetchAll(req, res) {
        return purchaseOrder.findAll({
            include: [{
                model: db.product
            }]
        })
            .then(purchaseOrders => res.status(201).send(purchaseOrders))
            .catch(error => res.status(401).send(error))
    },
    fetchAllUnProcessedOrders(req, res) {
        return purchaseOrder.findAll({
            where: {processed: 'N'},
            include: [{
                model: db.product
            }]
        })
            .then(purchaseOrders => res.status(201).send(purchaseOrders))
            .catch(error => res.status(401).send(error))
    },
    fetchAllProcessedOrders(req, res) {
        return purchaseOrder.findAll({
            where: {processed: 'Y'},
            include: [{
                model: db.product
            }]
        })
            .then(purchaseOrders => res.status(201).send(purchaseOrders))
            .catch(error => res.status(401).send(error))
    }

};