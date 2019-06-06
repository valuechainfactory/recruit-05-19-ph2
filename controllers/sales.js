'use strict';
const Sale = require('./../models').sale;
const db = require('./../models');
//@todo ensure sale reduces the oldest inventory with available stock;
module.exports = {
    create(req, res) {
        return db.inventory.findAll(
            {
                where: {
                    stockQuantity: {
                        [db.Sequelize.Op.gte]: 0
                    },
                    productId: req.body.productId
                },
                include: [{
                    model: db.product
                }],
                group: ['id'],
                order: [['createdAt', 'DESC']],
                limit: 1
            }
        ).then(batch => {
            return Sale.create(
                {
                    quantity: req.body.quantity,
                    productId: req.body.productId,
                    inventoryId: batch[0].id
                })
                .then(sale => res.status(201).send(sale))
                .catch(error => res.status(401).send(error))
        });
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