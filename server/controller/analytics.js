const Question = require('../models/Questions')
const User = require('../models/User')

function buildSolvedHistory(questions,noOfDays){
    const today = new Date();
    const result = [];

    for(let i=noOfDays-1;i>=0;i--){
        const day = new Date(today);
        day.setDate(day.getDate()-i);
        const dayString = day.toLocaleDateString();
        
        const count = questions.filter(q=>{
            if(!q.solvedAt){
                return false;
            }
            return (
                new Date(q.solvedAt).toLocaleDateString() === dayString
            );
        }).length;

        result.push({
            date: dayString,
            count});
    }
    return result;
}

async function handleGetAnalytics(req,res){
    try{
        const questions = await Question.find({userId : req.user.id});

        const easy = questions.filter(q=> q.difficulty === 'Easy').length;
        const medium = questions.filter(q=> q.difficulty === 'Medium').length;
        const hard = questions.filter(q=> q.difficulty === 'Hard').length;

        const topicCount ={}

        questions.forEach(q => {
            topicCount[q.topic] = (topicCount[q.topic] || 0) +1;
        });

        const solved = questions.filter(q=>q.status === "solved").length;

        const completionPercentage  = questions.length === 0 ? 0 : Math.round((solved/ questions.length) * 100);

        const weeklySolved =buildSolvedHistory(questions,7) ;

        const activityHeatmap = buildSolvedHistory(questions,90);

        const totalques = questions.length
        const helpBreakdown  = [
            { name:'No Help' , value: questions.filter((q) => q.helpTaken === 'No Help').length},
            { name:'Help Taken' , value: questions.filter((q) => q.helpTaken === 'Help Taken').length},
            { name:'Watched Solution' , value: questions.filter((q) => q.helpTaken === 'Watched Solution').length}
        ]

        const totalTime = questions.reduce((sum,q)=> sum + Number(q.timeTaken),0)
        const avgTime = totalques >0 ? Math.round(totalTime/totalques): 0

        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({msg:'User Not found'});
        }
        const streak = user.streak;
        
        return res.status(200).json({
            easy,
            medium,
            hard,
            topicDistribution :topicCount,
            completionPercentage ,
            weeklySolved,
            streak,
            avgTime,
            helpBreakdown,
            activityHeatmap 
        })
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

module.exports = handleGetAnalytics;