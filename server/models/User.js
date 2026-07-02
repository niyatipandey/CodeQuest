const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    passwordHash:{
        type:String,
        required:true,
    },
    streak:{
        type:Number,
        default:0,
    },
    lastSolvedDate:{
        type: Date,
        default: null
    },
    currentSkill:{
        type:String,
        default:"",
    },
    targetSkill:{
        type:String,
        default:"",
    },
    completedSkills:{
        type:[String],
        default:[],
    },
    dailyGoal:{
        type:Number,
        default:2,
    },
})

const User = mongoose.model('User',userSchema);


module.exports = User;

