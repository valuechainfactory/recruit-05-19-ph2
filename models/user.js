'use strict';
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.ENUM({
                values: ['Retailer', 'WareHouseAttendant']
            }),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
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
    user.beforeCreate((user) => {
        return user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    //This will check if an unhashed password entered by the
    //user can be compared to the hashed password stored in our database
    user.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    return user;
};