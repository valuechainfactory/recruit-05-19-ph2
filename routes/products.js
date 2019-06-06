const env = require('./../env');
const productController = require('./../controllers').product;
const invController = require('./../controllers').inventory;
const passport = require('passport');

module.exports = (app) => {
    app.post(env.ADD_PRODUCT,
        passport.authenticate('jwt', {session: false}), (req, res, next) =>
            productController.create(req, res, io)
    );
    app.put(env.UPDATE_PRODUCT,
        passport.authenticate('jwt', {session: false}), (req, res, next) =>
            productController.update(req, res)
    );
    app.get(env.GET_PRODUCTS,
        passport.authenticate('jwt', {session: false}), (req, res, next) =>
            productController.fetchAll(req, res)
    );
    app.get(env.GET_PRODUCTS_FOR_SALE,
        passport.authenticate('jwt', {session: false}), (req, res, next) =>
            invController.fetchProductsForSale(req, res)
    )
};

