var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const KEY = require('./jwtConfig').secret;
// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username/email and password
passport.use(new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
        usernameField: "username"
    },
    function (username, password, cb) {
        return db.user.findOne({
            where: {
                username: username
            }
        }).then(function (dbUser) {
            if (!dbUser) {
                return cb(null, false,
                    {message: 'Invalid Username'}
                );
            } else if (!dbUser.validPassword(password)) {
                return cb(null, false, {message: 'Invalid Credentials'}
                );
            }
            return cb(null, dbUser);
        }).catch(error => cb(error));
    }
));
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = KEY;

const strategy = new JWTStrategy(opts, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    return db.user.findOne(({
        where: {
            id: jwt_payload.id
        }
    })).then(user => {
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    }).catch(err => {
        next(null, false);
    });
});
passport.use(strategy);

module.exports = passport;