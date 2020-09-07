const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    author: {type: String, required: true},
    text: {type: String, required: true},
});


const chatsSchema = new Schema({
    title: {type: String, required: true},
    messages: [messageSchema],
    createdAt: {
        type: Date,
        required: false,
        default: new Date(),
    },
    user: {type: Schema.Types.ObjectId, ref: 'Users'}
})

module.exports = mongoose.model('Chats', chatsSchema, 'chats')
