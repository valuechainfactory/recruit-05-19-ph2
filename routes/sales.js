const env = require('./../env');
const salesController = require('./../controllers').sales;

module.exports = (app) => {
    app.post(env.CREATE_SALE, (req, res, next) =>
        salesController.create(req, res, next)
    );

    app.get(env.GET_ALL_SALES, (req, res, next) =>
        salesController.fetchAll(req, res, next)
    )
};