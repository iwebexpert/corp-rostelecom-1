const mongoose = require('./mongodb')

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: Boolean, required: false, default: false },
    createdAt: { type: Date, required: false, default: new Date() },
})

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    items: [itemSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
})


module.exports = mongoose.model('Tasks', taskSchema, 'tasks')
