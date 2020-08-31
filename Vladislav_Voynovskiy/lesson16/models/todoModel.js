const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false,
  },
})

module.exports = mongoose.model('todoApp', todoSchema, 'tasks')