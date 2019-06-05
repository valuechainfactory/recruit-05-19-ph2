'use strict';
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
    return inventory;
};