'use strict';
module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define('product', {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        reorderLevel: {
            type: DataTypes.INTEGER
        },
        reorderQuantity: {
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
    product.associate = function ({inventory,sale}) {
        product.hasMany(inventory);
        product.hasMany(sale);

    };
    return product;
};