'use strict';
const db = require('./../models');
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
        }
    }, {});
    purchaseOrder.associate = ({product}) => {
        purchaseOrder.belongsTo(product)
    };
    purchaseOrder.beforeCreate((order) => {
        try {
            return purchaseOrder.findAll({
                where: {
                    productId: order.productId,
                    processed: 'N'
                }
            }).then(function (result) {
                if (result.length >= 1) {
                    throw new Error(409);
                } else {

                }
            });
        } catch (e) {
            console.log(e);
        }
    });

    purchaseOrder.afterUpdate((purchaseOrder) => {
        if (purchaseOrder.processed === 'Y') {
            const product = purchaseOrder.getProduct();
            return product.then(product => {
                return product.createInventory({
                    batchNo: 2,
                    suppliedQuantity: purchaseOrder.orderQuantity,
                    stockQuantity: purchaseOrder.orderQuantity,
                    productId: product.id,
                    purchaseOrderId: purchaseOrder.id
                });
            })
        }
    });
    return purchaseOrder;
}
;