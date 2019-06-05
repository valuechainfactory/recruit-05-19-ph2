'use strict';
const Inventory = require('./../models').inventory;
const db = require('./../models');
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
    },
    fetchByProduct(req, res) {
        return Inventory.findAll({
            where: {productId: req.body.productId}
        }).then(inventoryRecs => res.status(201).send(inventoryRecs))
            .catch(error => res.status(401).send(error))
    },
    fetchProductsForSale(req, res) {
        return Inventory.findAll(
            {
                attributes: [[db.sequelize.fn('sum', models.sequelize.col('stockQuantity')), 'stockQuantity']],
                include: [
                    {
                        model: db.product,
                        attributes: [['name', 'name']],
                    }
                ],
                group: ['batchNo', 'name']
            }
        ).then(availableProducts => res.status(201).send(availableProducts))
            .catch(error => res.status(401).send(error))
    }

};