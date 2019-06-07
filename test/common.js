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
var token = null;
module.exports = {
    getToken() {
        return token;
    },
    createTestData() {
        return this.dropDemoData().then(TEST_PRODUCTS.forEach(async product => {
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
                    }).then(async () => {
                        return await db.user.create({
                            username: 'tester',
                            role: 'Retailer',
                            password: 'tester'
                        }).then(user => {
                            return user;
                        })
                    })
                }
            ));
        }));
    },

    dropDemoData() {
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
};