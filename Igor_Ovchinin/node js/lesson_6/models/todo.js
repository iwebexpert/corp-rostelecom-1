const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    task: { type: String, required: true },
    check: { type: Boolean, required: true },
})

const todoSchema = new Schema({
    title: { type: String, required: true },
    task: [taskSchema],
    createdAt: {
        type: Date,
        required: false,
        default: new Date(),
    },
    user: { type: Schema.Types.ObjectId, ref: 'Users' }
})

module.exports = mongoose.model('Todo', todoSchema, 'checklist')