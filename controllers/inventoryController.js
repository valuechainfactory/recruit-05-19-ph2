'use strict';
const Inventory = require('./../models').inventory;
module.exports = {
    create(req, res) {
        return Inventory.create(
            {
                batchNo: req.body.batchNo,
                suppliedQuantity: req.body.suppliedQuantity,
                stockQuantity: req.body.stockQuantity
            })
            .then(inventory => res.status(201).send(inventory))
            .catch(error => res.status(401).send(error))
    },
    update(req, res) {
        return Inventory.update(
            {
                id: req.body.id,
                batchNo: req.body.batchNo,
                suppliedQuantity: req.body.suppliedQuantity,
                stockQuantity: req.body.stockQuantity
            })
            .then(inventory => res.status(201).send(inventory))
            .catch(error => res.status(401).send(error))
    },
    fetchAll(req, res) {
        return Inventory.fetchAll()
            .then(invRecords => res.status(201).send(invRecords))
            .catch(error => res.status(401).send(error))
    }
};