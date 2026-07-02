const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        required:true,
    },
    topic:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        default:"unsolved",
    },
    notes:{
        type:String,
        default:"",
    },
    solvedAt:{
        type:Date,
        default:null,
    },
    platform: { 
        type: String,
        default: ""
    },
    timeTaken: { 
        type: Number,
        default: 0
    },
    helpTaken: {
        type: String, 
        default: "No Help" },
    pinned: {
        type: Boolean,
        default: false
    }

})

const Question = mongoose.model('Question',questionSchema);

module.exports = Question;