const mongoose = require("mongoose")

const taskSchema = {
    title : String,
    isDone: Boolean,
    taskProviderName: String,
    taskDoerName: String,
    taskProvider: mongoose.Types.ObjectId,
    taskDoer: mongoose.Types.ObjectId
}

const Task = mongoose.model("Task", taskSchema);
module.exports = Task