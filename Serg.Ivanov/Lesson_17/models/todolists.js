const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todolistsSchema = new Schema({
    time: { type: String, required: false, default: 'В течение дня' },
    title: { type: String, required: true },
    createdAt: {
        type: Date,
        required: false,
        default: new Date(),
    },
})

module.exports = mongoose.model('todolist', todolistsSchema, 'list')