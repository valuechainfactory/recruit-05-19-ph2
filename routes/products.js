const env = require('./../env');
const productController = require('./../controllers').product;
const invController = require('./../controllers').inventory;

module.exports = (app) => {
    app.post(env.ADD_PRODUCT, (req, res, next) =>
        productController.create(req, res)
    );
    app.put(env.UPDATE_PRODUCT, (req, res, next) =>
        productController.update(req, res)
    );
    app.get(env.GET_PRODUCTS, (req, res, next) =>
        productController.fetchAll(req, res)
    );
    app.get(env.GET_PRODUCTS_FOR_SALE, (req, res, next) =>
        invController.fetchProductsForSale(req, res)
    )
};

