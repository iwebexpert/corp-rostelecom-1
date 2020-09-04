const mongoose = require('./mongodb')

//** установка схемы
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: Boolean, required: false, default: false },
    createdAt: { type: Date, required: false, default: new Date() },
})

const itemsModel = mongoose.model('Items', itemSchema, 'items')

function getItems() {
    mongoose.connectDB()
    return itemsModel.find({}).lean()
}

//** Добавляем данные в БД
function add(name) {
    mongoose.connectDB()
    let item = itemsModel({ name: name })
    item.save(function (err, doc) {
        if (err) {
            console.log(err)
            return
        }
        console.log("Объект сохранен ", doc)
    })
}

function remove(id) {
    mongoose.connectDB()
    itemsModel.findByIdAndDelete(id, function (err, doc) {
        if (err) {
            console.log(err)
            return
        }
        console.log("Объект удален ", doc)
    })
}

function update(id, status) {
    mongoose.connectDB()
    itemsModel.updateOne({ _id: id }, { status: status }, function (err, doc) {
        if (err) {
            console.log(err)
            return
        }
        console.log("Объект обновлен", doc)
    })
}

module.exports = {
    getItems: function () { return getItems() },
    add: function (name) { add(name) },
    remove: function (id) { remove(id) },
    update: function (id) { update(id) },
}

