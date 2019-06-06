// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const jwt = require('jsonwebtoken');
const KEY = require('./../config/jwtConfig').secret;
const env = require('./../env');
module.exports = function (app) {

    app.post(env.LOGIN, function (req, res, next) {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: info,
                    user: user
                });
            }
            req.login(user, {session: false}, (err) => {
                if (err) {
                    res.send(err);
                }
                const payload = {id: user.id};
                const token = jwt.sign(payload, KEY);
                return res.json({
                    username: user.username,
                    role: user.role,
                    token: token
                });
            });
        })(req, res);
    });

    app.post(env.SIGNUP, function (req, res) {
        return db.user.create({
            username: req.body.username,
            role: req.body.role,
            password: req.body.password
        }).then(() => {
            return db.user.findOne({
                where: {
                    username: req.body.username
                }
            }).then((user) => {
                res.status(200).json({id: user.id, username: user.username});
            });
        }).catch((err) => {
            res.status(422).json(err.errors[0].message);
        });
    });
// Route for logging user out
    app.get(env.LOGOUT, (req, res) =>
        req.logout()
    );

};