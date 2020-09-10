const mongoose = require('mongoose')
const Schema = mongoose.Schema

const toDoListSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    checked: { type: Boolean, requared: false, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'Users' }
})

module.exports = mongoose.model('toDoList', toDoListSchema, 'toDoList')
