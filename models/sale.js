'use strict';
const db = require('./../models');
module.exports = (sequelize, DataTypes) => {
    const sale = sequelize.define('sale', {
        quantity: DataTypes.INTEGER,
    }, {});
    sale.associate = function ({product, inventory}) {
        sale.belongsTo(product);
        sale.belongsTo(inventory)
    };
    /*
        Reduce the stock quantity of the oldest batch
     */
    sale.afterCreate((sale) => {
        return sale.getInventory().then(inventoryRec => {
            try {
                return inventoryRec.update(
                    {stockQuantity: inventoryRec.stockQuantity - sale.quantity}
                )
            } catch (e) {
                console.log(e);
            }
        });
    });
    return sale;
};