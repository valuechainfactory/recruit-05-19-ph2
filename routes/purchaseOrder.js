const env = require('./../env');
const orderController = require('./../controllers').purchaseOrder;
const passport = require('passport');

module.exports = (app, io) => {
    app.post(env.NEW_ORDER,
        passport.authenticate('jwt', {session: false}), (req, res, next) =>
            orderController.create(req, res, io)
    );
    app.put(env.UPDATE_ORDER,
        passport.authenticate('jwt', {session: false}), (req, res, next) =>
            orderController.update(req, res, io)
    );
    app.get(env.GET_ALL_ORDERS,
        passport.authenticate('jwt', {session: false}), (req, res, next) =>
            orderController.fetchAll(req, res)
    );
    app.get(env.GET_PENDING_ORDERS,
        passport.authenticate('jwt', {session: false}), (req, res, next) =>
            orderController.fetchAllUnProcessedOrders(req, res)
    );
    app.get(env.GET_PROCESSED_ORDERS,
        passport.authenticate('jwt', {session: false}), (req, res, next) =>
            orderController.fetchAllProcessedOrders(req, res)
    )
};