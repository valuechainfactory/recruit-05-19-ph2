'use strict';
const db = require('./../models');
const bcrypt = require('bcryptjs');
module.exports = {
    up: (queryInterface, Sequelize) => {
        'use strict';
        const hashPass = bcrypt.hashSync('tester1', bcrypt.genSaltSync(10), null);
        const createUsers = queryInterface.bulkInsert('users', [{
            username: 'Retailer',
            role: 'Retailer',
            password: hashPass,
            createdAt: Sequelize.fn('NOW'),
            updatedAt: Sequelize.fn('NOW')
        }, {
            username: 'WareHouse',
            role: 'WareHouseAttendant',
            password: hashPass,
            createdAt: Sequelize.fn('NOW'),
            updatedAt: Sequelize.fn('NOW')
        }
        ], {});
        const createProducts = createUsers.then(() =>
            queryInterface.bulkInsert('products', [{
                name: 'Mango Juice',
                reorderLevel: 5,
                reorderQuantity: 5,
                createdAt: Sequelize.fn('NOW'),
                updatedAt: Sequelize.fn('NOW')
            }, {
                name: 'PineApple Juice',
                reorderLevel: 2,
                reorderQuantity: 5,
                createdAt: Sequelize.fn('NOW'),
                updatedAt: Sequelize.fn('NOW')
            }, {
                name: 'Apple Juice',
                reorderLevel: 3,
                reorderQuantity: 5,
                createdAt: Sequelize.fn('NOW'),
                updatedAt: Sequelize.fn('NOW')
            }, {
                name: 'Passion Juice',
                reorderLevel: 4,
                reorderQuantity: 5,
                createdAt: Sequelize.fn('NOW'),
                updatedAt: Sequelize.fn('NOW')
            }, {
                name: 'Cocktail Juice',
                reorderLevel: 1,
                reorderQuantity: 5,
                createdAt: Sequelize.fn('NOW'),
                updatedAt: Sequelize.fn('NOW')
            },], {}));

        return createProducts.then(() => {
            return db.product.findAll().then(products =>
                products.forEach(product => {
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
        });
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([queryInterface.bulkDelete('products', null, {}),
            queryInterface.bulkDelete('purchaseOrders', null, {}),
            queryInterface.bulkDelete('inventories', null, {}),
            queryInterface.bulkDelete('users', null, {}),
            queryInterface.bulkDelete('sales', null, {})
        ]);
    }
}
;
