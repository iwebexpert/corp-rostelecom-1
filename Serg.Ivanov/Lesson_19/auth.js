const passport = require('passport')
const Strategy = require('passport-local')

const UsersModel = require('./models/users')
const e = require('express')

passport.use(
    new Strategy({ usernameField: 'email' }, async (username, password, done) => {
        const user = await UsersModel.findOne({ email: username })

        if (!user) {
            return done(null, false)
        }

        if (!user.validatePassword(password)) {
            return done(null, false)
        }

        const plainUser = JSON.parse(JSON.stringify(user))
        delete plainUser.password

        done(null, plainUser)
    })
)

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await UsersModel.findById(id)

    const plainUser = JSON.parse(JSON.stringify(user))
    delete plainUser.password

    done(null, plainUser)
})

module.exports = {
    initialize: passport.initialize(),
    session: passport.session(),

    authenticate: passport.authenticate('local', {
        successRedirect: '/chats',
        failureRedirect: '/auth?error=1',
    }),

    isAuthenticated: (req, res, next) => {
        if (req.user) {
            next()
        } else {
            res.redirect('/auth')
        }
    },

}