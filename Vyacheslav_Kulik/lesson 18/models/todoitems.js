var mongoose = require('mongoose')
var Schema = mongoose.Schema

const toDoItem = new Schema({
    text: {
        type: String,
        required: true
    },
    done:  {
        type:  Boolean
        //default: false
    }

})



module.exports = mongoose.model('ToDoItem', toDoItem, 'todoitem')


