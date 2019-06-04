'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: {
      type: DataTypes.STRING
    },
    reorderLevel: {
      type: DataTypes.STRING
    },
    reorderQuantity: {
      type: DataTypes.STRING
    }
  }, {});
  product.associate = function({inventory}) {
    product.hasMany(inventory)
  };
  return product;
};