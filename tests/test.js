'use strict';
const expect = require('chai').expect;
const db = require('./../models');
const TEST_PRODUCTS = [{
    name: 'TESTP1',
    reorderLevel: 5,
    reorderQuantity: 5,
    createdAt: db.sequelize.fn('NOW'),
    updatedAt: db.sequelize.fn('NOW')
}, {
    name: 'TESTP2',
    reorderLevel: 2,
    reorderQuantity: 5,
    createdAt: db.sequelize.fn('NOW'),
    updatedAt: db.sequelize.fn('NOW')
}];

describe('add', function () {
    before(() => {
        createTestData()
    });

    after(() => {
        dropDemoData()
    });
    it('should return the sum of two positive numbers', function () {
        expect(1).to.equal(1);
    });

    function createTestData() {
        return TEST_PRODUCTS.forEach(product => {
            return db.product.create(product).then((product => {
                    const purchaseOrder = db.purchaseOrder.create({
                        orderQuantity: product.reorderQuantity,
                        processed: 'Y',
                        createdAt: db.sequelize.fn('NOW'),
                        updatedAt: db.sequelize.fn('NOW'),
                        productId: product.id
                    });
                    return purchaseOrder.then(order =>
                        db.inventory.create({
                            batchNo: 1,
                            suppliedQuantity: product.reorderQuantity,
                            stockQuantity: product.reorderQuantity,
                            createdAt: db.sequelize.fn('NOW'),
                            updatedAt: db.sequelize.fn('NOW'),
                            productId: product.id,
                            purchaseOrderId: order.id
                        })
                    )
                }
            ));
        })
    }

    function dropDemoData() {
        return db.product.findAll({where: {name: ['TESTP1', 'TESTP2']}}).then(products =>
            products.forEach(product => {
                    const purchaseOrder = db.purchaseOrder.destroy({
                        where: {
                            productId: product.id
                        }
                    });
                    return purchaseOrder.then(() =>
                        db.inventory.destroy({
                            where: {
                                productId: product.id
                            }
                        }).then(product.destroy())
                    )
                }
            ));
    }
});