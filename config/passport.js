var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
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

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: KEY
    },
    function (jwtPayload, cb) {

        //find the user in db if needed
        return db.user.findOne(({
            where: {
                id: jwtPayload.id
            }
        })).then(user => {
            return cb(null, user);
        })
            .catch(err => {
                return cb(err);
            });
    }
));
module.exports = passport;