const mongoose = require('mongoose')

const Schema = mongoose.Schema



const todoSchema = new Schema({
    title: { type: String, required: true },
    isDone: {
        type: Boolean,
        required: false,
        default: false,
    },

    user: { type: Schema.Types.ObjectId, ref: 'Users' }
})

module.exports = mongoose.model('todoApp', todoSchema, 'tasks')