const env = require('./../env');
const invController = require('./../controllers').inventory;
module.exports = (app) => {
    app.post(env.ADD_INV_RECORD, (req, res, next) =>
        invController.create(req, res)
    );
    app.put(env.UPDATE_INV_RECORD, (req, res, next) =>
        invController.update(req, res)
    );
    app.get(env.GET_INV_RECORDS_BY_PRODUCT, (req, res, next) =>
        invController.fetchByProduct(req, res)
    );
    app.get(env.GET_ALL_INV_RECORDS, (req, res, next) =>
        invController.fetchAll(req, res)
    )
};