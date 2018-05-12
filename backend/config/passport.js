const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const models = require('../models');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        try {
            models.user.findOne({where : {username: jwt_payload.username}}).then((user) => {
                if(user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        } catch(e) {
            throw e;
            return done(null, e);
        }
    }));
}

