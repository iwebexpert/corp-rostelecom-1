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

        done(null, plainUser) //req.user
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

    //Обработчик для auth
    authenticate: passport.authenticate('local', {
        successRedirect: '/todos',
        failureRedirect: '/auth?error=1',
    }),

    //Проверяем возможность доступа
    isAuthenticated: (req, res, next) => {
        if (req.user) {
            next()
        } else {
            res.redirect('/auth')
        }
    },

}