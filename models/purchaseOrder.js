'use strict';
module.exports = (sequelize, DataTypes) => {
    const purchaseOrder = sequelize.define('purchaseOrder', {
        orderQuantity: {
            type: DataTypes.INTEGER
        },
        processed: {
            type: DataTypes.ENUM({
                values: ['Y', 'N']
            }),
            allowNull: false,
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
    purchaseOrder.associate = ({product}) => {
        purchaseOrder.belongsTo(product)
    };

    purchaseOrder.afterUpdate((purchaseOrder) => {
        if (purchaseOrder.processed === 'Y') {
            const product = purchaseOrder.getProduct();
            return product.then(product => {
                return product.createInventory({
                    batchNo: 2,
                    suppliedQuantity: purchaseOrder.orderQuantity,
                    stockQuantity: purchaseOrder.orderQuantity,
                    createdAt: sequelize.fn('NOW'),
                    updatedAt: sequelize.fn('NOW'),
                    productId: product.id,
                    purchaseOrderId: purchaseOrder.id
                });
            })
        }
    });
    return purchaseOrder;
};