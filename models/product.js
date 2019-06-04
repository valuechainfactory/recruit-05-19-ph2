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
        }
    }, {});
    product.associate = function ({inventory,sale}) {
        product.hasMany(inventory);
        product.hasMany(sale);

    };
    return product;
};