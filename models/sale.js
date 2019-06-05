'use strict';
const Inv = require('models');
module.exports = (sequelize, DataTypes) => {
    const sale = sequelize.define('sale', {
        quantity: DataTypes.INTEGER
    }, {});
    sale.associate = function ({product, inventory}) {
        sale.belongsTo(product);
        sale.belongsTo(inventory)
    };
    /*
        Reduce the stock quantity of the oldest batch
     */
    sale.afterCreate((sale) => {
        return sale.getInventory(inventory => {
            //@todo test this and verify that records are retured from association
            console.log(inventory);
        })
    });
    return sale;
};