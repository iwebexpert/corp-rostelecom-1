const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

let Users = require('./models/users')

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(username, password, done) {

        Users.findOne({ 'email': username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                console.log('this log func')
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validatePassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user)
        })
    }
))

passport.serializeUser(function(user, done) {
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
        console.log(user)
        const plainUser = JSON.parse(JSON.stringify(user))
        delete plainUser.password
        done(err, plainUser);
    })
})


module.exports = {
    initialize: passport.initialize(),
    session: passport.session(),

    //Обработчик для auth
    authenticate: passport.authenticate('local', {
        successRedirect: '/todo',
        failureRedirect: '/auth?error=1',
    }),

    //Проверяем возможность доступа
    isAuthenticated: (req, res, next) => {
        if(req.user){
            next()
        } else {
            res.redirect('/auth')
        }
    },

}