'use strict';
module.exports = (sequelize, DataTypes) => {
    const sale = sequelize.define('sale', {
        quantity: DataTypes.INTEGER
    }, {});
    sale.associate = function ({product, inventory}) {
        sale.belongsTo(product);
        sale.belongsTo(inventory)
    };
    return sale;
};