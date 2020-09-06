const passport = require('passport')
const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const UsersModel = require('./models/users')
const e = require('express')
const config = require('./config')

passport.use(
    new Strategy({
        secretOrKey: config.TOKEN_SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
        async (jwt_payload, done) => {
            console.log('JWT')
            console.log(jwt_payload)
            const user = await UsersModel.findOne({ email: jwt_payload.email })

            if (!user) {
                return done(null, false)
            }

            const plainUser = JSON.parse(JSON.stringify(user))
            delete plainUser.password

            done(null, plainUser) //req.user
        })
)

module.exports = {
    initialize: passport.initialize(),
    authenticate: passport.authenticate('jwt', { session: false }),
}