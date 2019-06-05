const env = require('./../env');
const orderController = require('./../controllers').purchaseOrder;

module.exports = (app) => {
    app.post(env.NEW_ORDER, (req, res, next) => {
        orderController.create(req, res);
    });
    app.put(env.UPDATE_ORDER, (req, res, next) => {
        orderController.update(req, res);
    });
    app.get(env.GET_ALL_ORDERS, (req, res, next) => {
        orderController.fetchAll(req, res);
    });
    app.get(env.GET_PENDING_ORDERS, (req, res, next) => {
        orderController.fetchAllUnProcessedOrders(req, res);
    });
    app.get(env.GET_PROCESSED_ORDERS, (req, res, next) => {
        orderController.fetchAllProcessedOrders(req, res);
    })
};