'use strict';
const Inventory = require('./../models').inventory;
const db = require('./../models');
module.exports = {
    create(req, res, io) {
        return Inventory.create(
            {
                batchNo: req.body.batchNo,
                suppliedQuantity: req.body.suppliedQuantity,
                stockQuantity: req.body.stockQuantity
            })
            .then(inventory => {
                io.emit('inventoryRecordCreated');
                return res.status(201).send(inventory)
            })
            .catch(error => res.status(401).send(error))
    },
    update(req, res,io) {
        return Inventory.update(
            {
                id: req.body.id,
                batchNo: req.body.batchNo,
                suppliedQuantity: req.body.suppliedQuantity,
                stockQuantity: req.body.stockQuantity
            })
            .then(inventory => {
                io.emit('inventoryRecordUpdated');
                return res.status(201).send(inventory)
            })
            .catch(error => res.status(401).send(error))
    },
    fetchAll(req, res) {
        return Inventory.findAll()
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
                where: db.sequelize.where(
                    db.sequelize.literal('stockQuantity'),
                    '>',
                    0),
                attributes: [[db.sequelize.fn('sum', db.sequelize.col('stockQuantity')), 'stockQuantity']],
                include: [{
                    model: db.product
                }],
                group: ['productId']
            }
        ).then(availableProducts => res.status(201).send(availableProducts))
            .catch(error => rconsle.es.status(401).send(error))
    },
    getProductStockBalance(productId) {
        return Inventory.findAll({
            where: {productId: productId},
            attributes: ['productId', [db.sequelize.fn('sum', db.sequelize.col('stockQuantity')), 'stockBalance']],
            group: ['productId'],
            raw: true
        });
    }
};