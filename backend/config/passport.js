const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
//const config = require('../config/database').get(process.env.NODE_ENV);

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = "the wind of the second era";
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        try {
            User.findOne({where : {username: jwt_payload.username}}).then((user) => {
                if(user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        } catch(e) {
            return done(null, e);
        }
    }));
}
