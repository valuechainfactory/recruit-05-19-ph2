'use strict';
const purchaseOrder = require('./../models').purchaseOrder;
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
        return purchaseOrder.update(
            {
                id: req.body.id,
                orderQuantity: req.body.orderQuantity,
                productId: req.body.productId,
                processed: req.body.processed
            })
            .then(purchaseOrder => res.status(201).send(purchaseOrder))
            .catch(error => res.status(401).send(error))
    },
    fetchAll(req, res) {
        return purchaseOrder.fetchAll()
            .then(purchaseOrders => res.status(201).send(purchaseOrders))
            .catch(error => res.status(401).send(error))
    },
    fetchAllUnProcessedOrders(req, res) {
        return purchaseOrder.fetchAll({where: {processed: 'N'}})
            .then(purchaseOrders => res.status(201).send(purchaseOrders))
            .catch(error => res.status(401).send(error))
    },
    fetchAllProcessedOrders(req, res) {
        return purchaseOrder.fetchAll({where: {processed: 'Y'}})
            .then(purchaseOrders => res.status(201).send(purchaseOrders))
            .catch(error => res.status(401).send(error))
    }

};