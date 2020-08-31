const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: { type: String, required: true },
    desc: { type: String, required: false, defaul: '' },
    closeDate: {
        type: Date,
        required: false
    },
    done: { type: Boolean, required: true, default: false }
}, {
    timestamps: true
})

const Tasks = {
    model: mongoose.model('Task', taskSchema),

    list: async function () {
        const task_list = await this.model.find({}).lean()
        return task_list
    },

    update: async function (task) {
        console.log(task)
        const dbres = await this.model.updateOne({ _id: task._id }, { done: task.done, closeDate: task.closeDate })
        return dbres
    },

    add: async function (task) {
        const dbtask = new this.model({ name: task.name, desc: task.desc })
        const dbres = await dbtask.save()
        return dbres
    },

    delete: async function (id) {
        const dbres = await this.model.findOneAndDelete({ _id: id }).exec()
        return dbres
    }

}

module.exports = Tasks
