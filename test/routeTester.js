const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const assert = chai.assert;
const expect = require('chai').expect;
const request = require('supertest');
const common = require('./common');
const app = require('../app');
const db = require('../models');
const env = require('./../env');
const invController = require('./../controllers').inventory;

describe('Unit testing the app routes', function () {
    let token = null;
    let a = 0;
    before(() => {
        return new Promise((resolve) => {
            common.createTestData().then(() => {
                request(app)
                    .post(env.LOGIN)
                    .send({username: 'tester', password: 'tester'})
                    .then(function (response) {
                        token = response.body.token;
                    });
            });
            setTimeout(() => {
                a = 1;
                resolve();
            }, 400);
        });

    });
    after(() => {
        common.dropDemoData();
    });
    it('should return 1 after sale of one item', function () {
        let currentStock = 0;
        return db.product.findAll({
            where: {name: ['TESTP1']},
            include: [{model: db.inventory, limit: 1, order: [['createdAt', 'DESC']]}]
        }).then(products => {
            const saleProduct = products[0];
            currentStock = saleProduct.inventories[0].stockQuantity;
            const postSale = request(app)
                .post(env.CREATE_SALE)
                .send({
                    quantity: 1,
                    productId: saleProduct.id,
                    inventoryId: saleProduct.inventories[0].id
                })
                .set('Authorization', 'Bearer ' + token)
                .then(function (response) {
                    return response.body;
                }).catch(error => error
                );
            return postSale.then(sale => {
                return assert.eventually.equal(invController.getProductStockBalance(sale.productId)
                        .then(result => currentStock - result[0].stockBalance)
                    , 1)
            });
        })
    });
    it('Should RETURN 2 unprocessed purchase Orders', function () {
        let currentStock = 0;
        return db.product.findAll({
            where: {name: ['TESTP2']},
            include: [{model: db.inventory, limit: 1, order: [['createdAt', 'DESC']]}]
        }).then(products => {
            const saleProduct = products[0];
            currentStock = saleProduct.inventories[0].stockQuantity;
            const postSale = request(app)
                .post(env.CREATE_SALE)
                .send({
                    quantity: 5,
                    productId: saleProduct.id
                })
                .set('Authorization', 'Bearer ' + token)
                .then(function (response) {
                    return response.body;
                }).catch(error => error
                );
            const product = postSale.then(sale =>
                db.product.findOne({
                    where: {id: sale.productId},
                    include: [{model: db.purchaseOrder}]
                }));
            return product.then(product => {
                assert.equal(product.purchaseOrders.length, 2) &&
                assert.eventually.equal(invController.getProductStockBalance(product.id), 2);
            });
        })
    });

    it('Should increase current stock by processed order quantity', function () {
        let currentStock = 0;
        return db.product.findAll({
            where: {name: ['TESTP1']},
            include: [{model: db.inventory, limit: 1, order: [['createdAt', 'DESC']]}]
        }).then(products => {
            const saleProduct = products[0];
            currentStock = saleProduct.inventories[0].stockQuantity;
            const postSale = request(app)
                .post(env.CREATE_SALE)
                .send({
                    quantity: 6,
                    productId: saleProduct.id,
                })
                .set('Authorization', 'Bearer ' + token)
                .then(function (response) {
                    return response.body;
                }).catch(error => error
                );
            const product = postSale.then(sale =>
                db.product.findOne({
                    where: {id: sale.productId},
                    include: [{model: db.purchaseOrder, where: {processed: 'N'}}]
                }));
            return product.then(product => {
                let purchaseOrder = product.purchaseOrders[0];
                return purchaseOrder.update({processed: 'Y', updatedAt: db.sequelize.fn('NOW')}).then(order => {
                    return invController.getProductStockBalance(product.id).then(stock => {
                        assert.equal(stock[0].stockBalance, 5);
                    })
                });
            });
        })
    });

    it('should return message on rendering', function () {
        return request(app)
            .get('/')
            .then(function (response) {
                expect(response.text).to.contain('</html>');
            })
    });

})
;