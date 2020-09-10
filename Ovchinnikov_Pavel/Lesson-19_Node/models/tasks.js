const mongoose = require('./mongodb')

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: Boolean, required: false, default: false },
    createdAt: { type: Date, required: false, default: new Date() },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
})

module.exports = mongoose.model('Tasks', taskSchema, 'tasks')
