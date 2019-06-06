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
                    productId: product.id,
                    purchaseOrderId: purchaseOrder.id
                });
            })
        }
    });
    return purchaseOrder;
};