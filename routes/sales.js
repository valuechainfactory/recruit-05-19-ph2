const env = require('./../env');
const salesController = require('./../controllers').sales;

module.exports = (app,io) => {
    app.post(env.CREATE_SALE, (req, res, next) => {
        return salesController.create(req, res, next,io)
    });

    app.get(env.GET_ALL_SALES, (req, res, next) =>
        salesController.fetchAll(req, res, next)
    )
};