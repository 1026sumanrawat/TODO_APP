const mongoose = require('mongoose')
const subscriberSchema = new mongoose.Schema({


    // id: {

    //     type : String
    //     // required : true
    // },
    titleOfTask : {

        type: String,
        required: true
    },
    description :{
        type: String

    },
    dueDate:{
        type:Date,
        default: Date.now
    },
    createdDate : {
        type: Date,
        default: Date.now

    },

    lastModifiedDate : {
        type: Date,
        default: Date.now

    },
    todo_completed: {
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('subscriber', subscriberSchema)