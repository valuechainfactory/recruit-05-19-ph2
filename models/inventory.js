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
    }
  }, {});
  inventory.associate = function({product}) {
    inventory.belongsTo(product)
  };
  return inventory;
};