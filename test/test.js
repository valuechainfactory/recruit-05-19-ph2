'use strict';
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const assert = chai.assert;
const db = require('./../models');
const invController = require('./../controllers').inventory;
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

describe('Should test sales, orders, and order dispatching', function () {
    let a = 0;
    before(() => {
        return new Promise((resolve) => {
            createTestData();
            setTimeout(() => {
                a = 1;
                resolve();
            }, 400);

        });
    });
    after(() => {
        dropDemoData();
    });
    it('New sale Should reduce inventory quantity by one', function () {
        let currentStock = 0;
        return db.product.findAll({
            where: {name: ['TESTP1']},
            include: [{model: db.inventory, limit: 1, order: [['createdAt', 'DESC']]}]
        }).then(products => {
            const saleProduct = products[0];
            currentStock = saleProduct.inventories[0].stockQuantity;
            const newSale = db.sale.create({
                quantity: 1,
                productId: saleProduct.id,
                inventoryId: saleProduct.inventories[0].id,
                createdAt: db.sequelize.fn('NOW'),
                updatedAt: db.sequelize.fn('NOW')

            });
            return newSale.then(sale => {
                return assert.eventually.equal(invController.getProductStockBalance(sale.productId)
                        .then(result => currentStock - result[0].stockBalance)
                    , 1)
            });
        })
    });

    it('Should create a unprocessed purchase Order', function () {
        return db.product.findAll({
            where: {name: ['TESTP2']},
            include: [{model: db.inventory, limit: 1, order: [['createdAt', 'DESC']]}]
        }).then(products => {
            const saleProduct = products[0];
            const newSale = db.sale.create({
                quantity: 5,
                productId: saleProduct.id,
                inventoryId: saleProduct.inventories[0].id,
                createdAt: db.sequelize.fn('NOW'),
                updatedAt: db.sequelize.fn('NOW')

            });
            const product = newSale.then(sale =>
                db.product.findOne({
                    where: {id: sale.productId},
                    include: [{model: db.purchaseOrder}]
                }));
            return product.then(product => {
                assert.equal(product.purchaseOrders.length, 2) &&
                assert.eventually.equal(invController.getProductStockBalance(product.id), 2);
            });
        })
    });

    function createTestData() {
        return dropDemoData().then(TEST_PRODUCTS.forEach(async product => {
            return await db.product.create(product).then((product => {
                    const purchaseOrder = db.purchaseOrder.create({
                        orderQuantity: product.reorderQuantity,
                        processed: 'Y',
                        createdAt: db.sequelize.fn('NOW'),
                        updatedAt: db.sequelize.fn('NOW'),
                        productId: product.id
                    });
                    return purchaseOrder.then(async order => {
                        return await db.inventory.create({
                            batchNo: 1,
                            suppliedQuantity: product.reorderQuantity + 2,
                            stockQuantity: product.reorderQuantity + 2,
                            createdAt: db.sequelize.fn('NOW'),
                            updatedAt: db.sequelize.fn('NOW'),
                            productId: product.id,
                            purchaseOrderId: order.id
                        });
                    })
                }
            ));
        }));
    }

    function dropDemoData() {
        return db.product.findAll({where: {name: ['TESTP1', 'TESTP2']}}).then(products =>
            products.forEach(product => {
                    const deleteAllSales = db.sale.destroy({where: {}});
                    const purchaseOrder = deleteAllSales.then(db.purchaseOrder.destroy({
                        where: {
                            productId: product.id
                        }
                    }));
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
})
;