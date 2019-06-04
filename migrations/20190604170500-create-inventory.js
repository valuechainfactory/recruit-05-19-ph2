'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('inventories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            batchNo: {
                type: Sequelize.INTEGER, allowNull: false
            },
            suppliedQuantity: {
                type: Sequelize.INTEGER, allowNull: false
            },
            stockQuantity: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('inventories');
    }
};