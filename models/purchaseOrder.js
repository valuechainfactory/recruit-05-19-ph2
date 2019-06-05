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
    return purchaseOrder;
};