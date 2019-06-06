const env = require('./../env');
const salesController = require('./../controllers').sales;
const passport = require('passport');

module.exports = (app, io) => {
    app.post(env.CREATE_SALE,
        passport.authenticate('jwt', {session: false}), (req, res, next) =>
            salesController.create(req, res, next, io)
    );

    app.get(env.GET_ALL_SALES,
        passport.authenticate('jwt', {session: false}), (req, res, next) =>
            salesController.fetchAll(req, res, next)
    )
};