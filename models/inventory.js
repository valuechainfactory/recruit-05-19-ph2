const db = require('./../models');
module.exports = (sequelize, DataTypes) => {
    const inventory = sequelize.define('inventory', {
        batchNo: {
            type: DataTypes.INTEGER, allowNull: false
        },
        suppliedQuantity: {
            type: DataTypes.INTEGER, allowNull: false
        },
        stockQuantity: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW')
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW')
        }
    }, {});
    inventory.associate = function ({product, purchaseOrder}) {
        inventory.belongsTo(product);
        inventory.belongsTo(purchaseOrder);
    };
    inventory.afterUpdate((invRec) => {
        return inventory.findAll({
            where: {productId: invRec.productId},
            attributes: ['productId', [sequelize.fn('sum', sequelize.col('stockQuantity')), 'stockBalance']],
            group: ['productId'],
            raw: true
        }).then(balance => {
            return invRec.getProduct()
                .then(product => {
                    if (product.reorderLevel <= balance[0].stockBalance) {
                        return product.createPurchaseOrder({
                            orderQuantity: product.reorderQuantity,
                            processed: 'N',
                            createdAt: sequelize.fn('NOW'),
                            updatedAt: sequelize.fn('NOW'),
                            productId: product.id
                        }).then(order=> order);
                    }
                })
        })
    });
    return inventory;
};