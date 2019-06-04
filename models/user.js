'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true
    },
    role: {
      type: DataTypes.ENUM({
        values: ['Retailer', 'WareHouseAttendant']
      }),
      allowNull:false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {});
  return user;
};