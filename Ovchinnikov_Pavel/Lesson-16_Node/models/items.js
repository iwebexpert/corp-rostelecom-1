const mongoose = require('mongoose')
const Schema = mongoose.Schema

//** установка схемы
const itemSchema = new Schema({
    name: { type: String, required: true },
    status: { type: Boolean, required: false, default: false },
    createdAt: { type: Date, required: false, default: new Date() },
})

//** подключение к БД mongodb
function connectDB() {
    if (mongoose.connection.readyState != 1)
        mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true })
}

// Класс рабатает со схемой
class items {
    constructor() {
        connectDB()
        this._item = mongoose.model('item', itemSchema)
    }

    //** Добавляем данные в БД
    add(name) {
        let item = new this._item({ name: name })
        item.save(function (err, doc) {
            if (err) {
                console.log(err)
                return
            }

            console.log("Объект сохранен ", item)
        })
    }

    delete(id) {
        this._item.findByIdAndDelete(id, function (err, doc) {
            if (err) {
                console.log(err)
                return
            }

            console.log("Объект удален, id = ", id)
        })
    }

    update(id, status) {
        this._item.updateOne({ _id: id }, { status: status }, function (err, doc) {
            if (err) {
                console.log(err)
                return
            }

            console.log("Объект обновлен", doc)
        })
    }

    getAll() {
        return this._item.find({}).lean()
    }
}

module.exports = new items()
