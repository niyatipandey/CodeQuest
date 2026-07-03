const express = require('express');
const Question = require('../models/Questions');
const User = require('../models/User')

async function handleGetQuestion(req,res){
    try{
    const quest = await Question.find({userId:req.user.id});
    return res.status(200).json(quest);
    }catch(err){
        return res.status(500).json({err:err.message})
    }
}

async function handlePostQuestion(req,res){

    const body = req.body;
    if(Object.keys(body).length === 0){
        return res.status(400).json({err:"No data found to create body"});
    }

    if(body.status === "solved"){
        body.solvedAt = new Date();
    }
    const quest = await Question.create({...body,userId:req.user.id});
    if(quest.status === "solved"){
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        
        if(!user.lastSolvedDate){
            user.streak = 1;
        }else{
            const lastSolved = new Date(user.lastSolvedDate).toISOString().split('T')[0];

            if(lastSolved !== todayString){
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate()-1);

                const yesterdayString = yesterday.toISOString().split('T')[0];
                if(lastSolved === yesterdayString){
                    user.streak +=1;
                }else{
                    user.streak =1;
                }
            }

        }
        user.lastSolvedDate = today;
        await user.save();
    }
    
    return res.status(201).json(quest);
}

async function handleUpdateQuestion(req,res){
    const id = req.params.id;
    if(!id){
        return res.status(400).json({err: "id not found"});
    }

    const result =await Question.findOneAndUpdate(
        {_id: id , userId: req.user.id},
        req.body,{
            new:true
        }
    )
    if(!result){
        return res.status(404).json({err:"Question not found"});
    }
    return res.status(200).json(result);
}

async function handleDeleteQuestion(req,res){
    const id = req.params.id;
    if(!id){
        return res.status(400).json({err: "id not found"});
    }
    const result =await Question.findOneAndDelete({_id: id , userId: req.user.id});

    if(!result){
        return res.status(404).json({err:"Question not found"});
    }

    return res.status(200).json({msg:`Deleted question with id:${id}`});
}

module.exports = {
    handleGetQuestion,
    handlePostQuestion,
    handleUpdateQuestion,
    handleDeleteQuestion,
}