const Goal = require('../models/Goal');

async function handleGetGoal(req,res){
    const result = await Goal.find({userId:req.user.id});
    if(result.length === 0){
        return res.status(200).json({msg:"No Goals set"});
    }
    return res.status(200).json(result);
}

async function handlePostGoal(req,res){
    const body = req.body;
    if(Object.keys(body).length === 0){
        return res.status(400).json({err:"No data found to create body"});
    }
    const result = await Goal.create({...body,userId:req.user.id});

    return res.status(201).json(result);
}

async function handleUpdateGoal(req,res) {
    const id = req.params.id;
    if(!id){
        return res.status(400).json({err:"id not found"});
    }
    const result = await Goal.findOneAndUpdate({_id: id , userId: req.user.id},req.body,
    {
        new:true
    });
    if(!result){
        return res.status(404).json({msg:"Goal not found"});
    }
    return res.status(200).json(result);
}

async function handleDeleteGoal(req,res){
    const id = req.params.id;
    if(!id){
        return res.status(404).json({err:"GoalId not found"});
    }
    const result = await Goal.findOneAndDelete({_id: id , userId: req.user.id});
    if(!result){
        return res.status(404).json({msg:"Goal not found"});
    }

    return res.status(200).json({msg:"Goal deleted"});
}

module.exports ={
    handleGetGoal,
    handlePostGoal,
    handleUpdateGoal,
    handleDeleteGoal,
}