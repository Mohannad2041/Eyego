const mongoose = require('mongoose');

const TaskSchema =  new mongoose.Schema({
    taskName:{
        type: String,
        required:[true, 'Please specify a name for the task'],
    },
    
    description:{
        type: String,
        required:[true, 'Please enter a description for the task']
    },

    isComplete:{
        type: Boolean,
        default: false
    },

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please specify the user who created the task']
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('Task', TaskSchema)