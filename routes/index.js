'use strict';
const passport = require('passport');
module.exports = (app) => {
    /* GET home page. */
    app.get('/',
        passport.authenticate('jwt', {session: false}), (req, res, next) =>
            res.sendFile('index.html')
    );
};

