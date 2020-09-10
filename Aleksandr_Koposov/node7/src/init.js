// Инициализация БД базовыми значениями

const path = require('path')
const mongoose = require('mongoose')

const TodoItemsModel = require(path.join(__dirname, 'models', 'todo'))
const UsersModel = require(path.join(__dirname, 'models', 'users'))

mongoose.connect(`mongodb://localhost/local?authSource=admin&w=1`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const users = [
    {
        email: 'test1@ya.ru',
        name: 'Test 1',
        password: '1111',
        tasks: [
            {
                name: 'Сделать задачу PRJ-337',
                desc: 'Необходимо реализовать получение данных из БД и выдачи в XML для взаимодействия с мастер-системой',
                done: false,
                important: true,
                planned: null,
                created: new Date(2020, 8, 8, 20, 20)
            },
            {
                name: 'Обновить данные из файла в PRJ-330',
                desc: '',
                done: false,
                important: false,
                planned: null,
                created: new Date(2020, 5, 10, 10)
            },
            {
                name: 'PRJ-200',
                desc: '',
                done: true,
                important: false,
                planned: new Date(2020, 4, 15, 20),
                created: new Date(2020, 4, 10, 10)
            }
        ]
    },
    {
        email: 'test2@ya.ru',
        name: 'Test 2',
        password: '2222',
        tasks: []
    },
    {
        email: 'test2@ya.ru',
        name: 'Test 3',
        password: '3333',
        tasks: [
            {
                name: 'PRJ-300',
                desc: 'Необходимо реализовать получение данных из БД и выдачи в XML для взаимодействия с мастер-системой',
                done: false,
                important: false,
                planned: new Date(2020, 8, 20, 20, 20),
                created: new Date(2020, 8, 8, 8, 20)
            },
            {
                name: 'PRJ-290',
                desc: '',
                done: false,
                important: false,
                planned: null,
                created: new Date(2020, 5, 10, 10)
            },
            {
                name: 'PRJ-220',
                desc: '',
                done: true,
                important: true,
                planned: new Date(2020, 3, 15, 20),
                created: new Date(2020, 3, 10, 10)
            }
        ]
    }
]
const init = async () => {
    for (const { email, name = '', password, tasks = [] } of users) {
        let userExists = await UsersModel.exists({ email })
        if (!userExists) {
            await new UsersModel({
                email,
                name,
                password
            }).save()
        }
        const usr = await UsersModel.findOne({ email })
        for (const task of tasks || []) {
            const tasksExists = await TodoItemsModel.exists({ name: task.name, user: usr._id })
            if (!tasksExists) {
                await (new TodoItemsModel({
                    ...task,
                    user: usr._id
                })).save()
            }
        }
    }
}
init().then(r => process.exit())
