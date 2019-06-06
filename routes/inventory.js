const env = require('./../env');
const invController = require('./../controllers').inventory;
const passport = require('passport');
module.exports = (app, io) => {
    app.post(env.ADD_INV_RECORD,
        passport.authenticate('jwt', {session: false}), (req, res, next) =>
            invController.create(req, res, io)
    );
    app.put(env.UPDATE_INV_RECORD,
        passport.authenticate('jwt', {session: false}), (req, res, next) =>
            invController.update(req, res, io)
    );
    app.get(env.GET_INV_RECORDS_BY_PRODUCT,
        passport.authenticate('jwt', {session: false}), (req, res, next) =>
            invController.fetchByProduct(req, res)
    );
    app.get(env.GET_ALL_INV_RECORDS,
        passport.authenticate('jwt', {session: false}), (req, res, next) =>
            invController.fetchAll(req, res)
    )
};