const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    text: {type: String, required: true},
    isDone: {
        type: Boolean,
        required: false,
        default: false,
    },
});


const todoSchema = new Schema({
    title: {type: String, required: true},
    items: [itemSchema],

    user: {type: Schema.Types.ObjectId, ref: 'Users'}
})

module.exports = mongoose.model('todo', todoSchema, 'tasks')
