const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    text:{
        type:String,
        default:"",
    },
    targetDate:{
        type:Date,
        required:true,
    },
    completed:{
        type:Boolean,
        default: false,
    },
})

const Goal = mongoose.model('Goal',goalSchema);

module.exports = Goal;