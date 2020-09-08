const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
    time: { type: String, required: true },
    task: { type: String, required: true },
});


const todolistsSchema = new Schema({
    dataList: { type: String, required: true },
    record: [recordSchema],
    createdAt: {
        type: Date,
        required: false,
        default: new Date(),
    },
    user: { type: Schema.Types.ObjectId, ref: 'Users' }
})

module.exports = mongoose.model('Todolists', todolistsSchema, 'todolists')
