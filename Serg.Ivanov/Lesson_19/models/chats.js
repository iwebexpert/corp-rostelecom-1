const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatsSchema = new Schema({
    title: { type: String, required: true },
    status: { type: String, required: true },

    createdAt: {
        type: Date,
        required: false,
        default: new Date(),
    },
    user: { type: Schema.Types.ObjectId, ref: 'Users' }
})

module.exports = mongoose.model('Chats', chatsSchema, 'chats')
