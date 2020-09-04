// код отвечает за авторизацию
const passport = require('passport')
const Strategy = require('passport-local') // конкретная локальная стратегия для данной библиотеки

const UsersModel = require('./models/users')  // ссылка на модель users
const e = require('express')

// в метод use передаем все стратегии которые реализует наше приложение 
passport.use(
    // указываем поле логина,  
    new Strategy({ usernameField: 'email' }, async (username, password, done) => {
        const user = await UsersModel.findOne({ email: username }) // получаем одного пользователя
        // если пользователя нет, возвращаем done. done -это аналог next
        if (!user) {
            return done(null, false)  // пользователь не авторизован
        }
        // убедимся что пароль правильный
        if (!user.validatePassword(password)) {
            return done(null, false)  // пользователь не авторизован
        }
        // если пароль правильный
        const plainUser = JSON.parse(JSON.stringify(user))
        delete plainUser.password  // изнутри удалим пароль, чтобы пароля в кэше не было
        // пользователь авторизован
        done(null, plainUser) //req.user
    })
)
// когда пользователя получаем из базы
passport.serializeUser((user, done) => {
    done(null, user._id)
})
// когда пользователя сохраняем в базе
passport.deserializeUser(async (id, done) => {
    // сходим в базу и заберем пользователя по id
    const user = await UsersModel.findById(id)

    const plainUser = JSON.parse(JSON.stringify(user))
    delete plainUser.password  // удалим пароль

    done(null, plainUser)
})

module.exports = {
    initialize: passport.initialize(),
    session: passport.session(),

    //Обработчик для auth
    authenticate: passport.authenticate('local', {
        successRedirect: '/todo',     // если авторизация пройдет успешно, перенаправить  
        failureRedirect: '/auth?error=1', // если не успешный
    }),

    // Middleware проверяем возможность доступа
    // Можно ли пользователю переходить на определенный url или нет
    isAuthenticated: (req, res, next) => {
        if (req.user) {  // есть ли user продолжаем работать стандартно.
            next()
        } else {
            res.redirect('/auth')
        }
    },

}