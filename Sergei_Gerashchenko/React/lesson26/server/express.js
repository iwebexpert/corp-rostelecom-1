const express = require('express')
const cors = require('cors')

const { Client } = require('pg')

const client = new Client({
    user: 'chat_user',
    host: '10.146.101.21',
    database: 'chat_test',
    password: '9P975AvgiFUd',
    port: 5432,
})
client.connect()





const app = express()
app.use(express.json())
app.use(cors())
app.options('*', cors());

const TOKEN_SECRET_KEY = 'kjhuiggaiusdfiuhiuaudigfuisdgfuil;hiugg'

const isAuthenticated = (req, res, next) => {
    if(req.headers.authorization){
        const [type, token] = req.headers.authorization.split(' ')

        jwt.verify(token, TOKEN_SECRET_KEY, (err, decoded) => {
            if(err){
                return res.status(403).send()
            }

            req.user = decoded
            next()
        })
    } else {
        return res.status(403).send()
    }

}

app.use(express.urlencoded({extended: false}))


app.use(express.static('public'))



//Проверка на авторизацию пользователя
app.use('/users', isAuthenticated)
app.use('/todo', isAuthenticated)


app.get('/chats',  async (req, res) => {
    // const todo_items = await chatsModel.find().populate('messages').lean()
    // res.status(200).json(todo_items)
    //await chatsModel.find().populate('messages').exec(function (err, data){
    //    res.status(200).json(data)
    //})
    let chats=[]
    const res1 = await client.query({rowMode: 'array',text : "select id, title from chats"})
    const rows =  res1.rows;
    for(let i=0; i<rows.length; i++){
        chats.push({'id' : rows[i][0], 'title': rows[i][1], messages : []})
    }
    res.status(200).json(chats)
})

app.get('/chats/:chatid',  async (req, res) => {

    let messages=[]
    const res1 = await client.query({rowMode: 'array',text : "select id, author, text from messages where chatid=$1",
        values : [req.params["chatid"]]})
    const rows =  res1.rows;
    for(let i=0; i<rows.length; i++){
        messages.push({'id' : rows[i][0], 'author': rows[i][1], 'text': rows[i][2]})
    }
    res.status(200).json({chatId: req.params["chatid"], messages : messages})
})


//Создание новой записи
app.post('/chats',  async (req, res) => {
    const {name} = req.body
    //
    // const item = new chatsModel({name: name})
    // item.save(function (err, doc) {
    //     if (err) {
    //         res.json(err)
    //         return
    //     }else {
    //         res.status(201).json(item)
    //     }
    // })
    const res1 = await client.query({rowMode: 'array',text : "insert into chats(title) values($1) RETURNING id",
        values : [name]})
    console.log(res1)
    res.status(201)
})

app.post('/chats/:chatid',  async (req, res) => {
    console.log(req.body)
    const {author, text} = req.body

    const res1 = await client.query({rowMode: 'array',
            text : "insert into messages(author, text, chatid) values($1, $2, $3) RETURNING id",
        values : [author, text, req.params["chatid"]]})

    const msgId=res1.rows[0][0];

    const res2 = await client.query({rowMode: 'array',
        text : "select author, text, chatid, id from  messages where id=$1",
        values : [msgId]})

    const item = ({author: res2.rows[0][0], text: res2.rows[0][1], chatid : res2.rows[0][2],
        id : res2.rows[0][3]});
    res.status(200).json(item);
})


//Регистрация пользователя
app.post('/register', async (req, res) => {
    const {repassword, ...restBody} =  req.body

    // const restBody = req.body
    // const repassword = restBody.repassword
    // delete restBody.repassword

    if(restBody.password === repassword){
        const user = new usersModel(restBody)
        await user.save()
        res.status(201).send()
    }
    else{
        res.status(400).json({message: 'User not exists'})
    }
})


// Авторизация пользователя
app.post('/auth', async (req, res) => {
    const {username, password} = req.body
    if(!username || !password){
        return res.status(401).json({message: "Не передан логин или пароль"})
    }

    const user = await usersModel.findOne({email: username})

    if(!user){
        return res.status(401).json({message: "Пользователь не найден"})
    }

    if(!user.validatePassword(password)){
        return res.status(401).json({message: "Неправильный логин/пароль"})
    }

    const plainUser = JSON.parse(JSON.stringify(user))
    delete plainUser.password

    res.status(200).json({
        ...plainUser,
        token: jwt.sign(plainUser, TOKEN_SECRET_KEY),
    })
})
app.listen(42018, () => {
    console.log('Server started...')
})


