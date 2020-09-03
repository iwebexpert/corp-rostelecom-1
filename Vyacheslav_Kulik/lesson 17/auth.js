const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

let Users = require('./models/users')


passport.use('local', new LocalStrategy(
    {
        usernameField: 'email_address' // поле формы авторизации, которое нужно использовать в качестве username
    },
    function (username, password, done) {

        Users.findOne({email: username}, function (err, user) {
            if (err) {
                return done(err);
            }
            // if (!user) { \\ эта ветка не используется, так как я реализовал ее через валидацию (express-validator)
            //     return done(null, false);
            // }
            // if (!user.validatePassword(password)) { \\ эта ветка не используется, так как я реализовал ее через валидацию (express-validator)
            //     console.log('validatePassword!!!!!')
            //     return done(null, false);
            // }
            const plainUser = JSON.parse(JSON.stringify(user))
            delete plainUser.password
            return done(null, plainUser)
        })
    }
))

passport.serializeUser(function (user, done) { //после процедуры авторизации поместить в куки данные о пользователе (его id)
    console.log(user, 'serializeUser')
    done(null, user._id) // - в куках выглядит вот так "passport":{"user":"5f50a39603361338b0cd067c"}
})

passport.deserializeUser(function (id, done) { //берется из записи сесии в BD  (passport":{"user":"5f50a39603361338b0cd067c"}) id = passport.user
    Users.findById(id, function (err, user) {
        const plainUser = JSON.parse(JSON.stringify(user))
        delete plainUser.password
        //console.log(plainUser, 'deserializeUser plainUser')
        done(err, plainUser); //  при logout  запись из сесии в БД удаляется - "passport":{}
    })
})


module.exports = {
    initialize: passport.initialize(),
    session: passport.session(),
    //Обработчик для auth
    authenticate: passport.authenticate('local', {
        session: true,
        successRedirect: '/todo'
    }),
    //защита от авторизованных пользователей
    checkAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/todo')
        } else {
            next()
        }
    },
    //защита от не авторизованных пользователей
    checkNotAuth: function (req, res, next) {
        if (!req.isAuthenticated()) { //защита от не авторизированых пользователей
            res.cookie('notFirstUseSite', 'true')
            res.redirect('/auth')
        } else {
            next()
        }
    },
    checkUserProfile: function (req, res, next) {
        if (req.params.id !== req.user._id) {
            res.redirect('/auth')
        } else {
            next()
        }
    }

}