import React from "react";

const Dashboard = ({questions,dailyGoal}) => {

  const difficultyColor = {
    Easy: "text-green-400",
    Medium: "text-yellow-400",
    Hard: "text-red-400"
  }

  const today = new Date()
  const todayDate = today.toLocaleDateString()
  const todaySolved = questions.filter((q)=> q.dateSolved === todayDate).length

  const totalSolved = questions.length
  const easyCount = questions.filter(q=> q.difficulty === 'Easy').length
  const mediumCount = questions.filter(q=> q.difficulty === 'Medium').length
  const hardCount = questions.filter(q=> q.difficulty === 'Hard').length

  const recentQuestion = questions.slice(-3).reverse()
  const currentTopic = questions[questions.length -1]?.topic
  const topicCount = {}

  questions.forEach(q => {
    topicCount[q.topic] = (topicCount[q.topic] || 0) +1
  });

  const uniqueDates = [...new Set(questions.map((q)=>q.dateSolved))]

  let streak = 0

  for(let i =0 ; i< uniqueDates.length; i++){
    const checkDate = new Date(today)
    checkDate.setDate(today.getDate()-i)

    if(uniqueDates.includes(checkDate.toLocaleDateString())) {
      streak++;
    }else{
      break;
    }
  }

  return (
    <div className='grid grid-cols-4 gap-4'>
      <div className='bg-[#172033] border border-[#24324A] rounded-xl p-5'>
        <p className='text-gray-300 text-sm' >Total Solved</p>
        <p className='text-white text-5xl font-bold mt-1'>{totalSolved}</p>
      </div>
      <div className='bg-[#172033] border border-[#24324A] rounded-xl p-5'>
        <p className='text-gray-300 text-sm'>Easy</p>
        <p className='text-green-400 text-5xl font-bold mt-1'>{easyCount}</p>
      </div>
      <div className='bg-[#172033] border border-[#24324A] rounded-xl p-5'>
        <p className='text-gray-300 text-sm'>Medium</p>
        <p className='text-yellow-400 text-5xl font-bold mt-1'>{mediumCount}</p>
      </div>
      <div className='bg-[#172033] border border-[#24324A] rounded-xl p-5'>
        <p className='text-gray-300 text-sm'>Hard</p>
        <p className='text-red-400 text-5xl font-bold mt-1'>{hardCount}</p>
      </div>
      <div className='col-span-4 rounded-xl p-5
      bg-[#172033] border border-[#24324A]'>
        <p className='text-cyan-300 text-sm'>Current Topic Focus</p>
        <p className='text-white text-2xl font-bold mt-1'>🎯 {currentTopic || "No Topic Yet"}</p>
      </div>

      <div className='col-span-2 bg-[#172033] border border-[#24324A] rounded-xl p-5'>
        <p className='text-gray-400 text-sm'>Daily Goal Progress</p>
        <p className='text-white text-lg font-bold'>{todaySolved} / {dailyGoal} questions</p>
        {todaySolved >= dailyGoal && <span className='text-green-400 text-sm font-bold'>🎉 Goal Complete!</span>}
        <div className='w-full bg-slate-700 rounded-full h-2 mt-4 overflow-hidden'>
          <div className={`h-2 rounded-full transition-all ${todaySolved>=dailyGoal ? 'bg-green-500' : 'bg-blue-500'}`} style={{width: `${Math.min((todaySolved/dailyGoal)*100,100)}%`}}>
          </div>
        </div>
      </div>
      <div className='col-span-2 bg-[#172033] border border-[#24324A] rounded-xl p-5'>
        <p className='text-gray-400 text-sm'>Current Streak</p>
        <p className='text-white text-2xl font-bold mt-1'>🔥 <span className="'text-white text-3xl">{streak} </span>{streak === 1 ? "day" : "days"} Streak</p>
        {streak >= 7 && <p className='text-yellow-400 text-sm mt-1'>👑 Absolute consistency!</p>}
      </div>

      <div className='col-span-4'>
        <p className='col-span-4 text-white text-2xl font-bold mt-1 mb-2'>Recent Questions</p>
        {recentQuestion.length === 0 && <div className="border border-[#24324A] rounded-xl py-12 text-center mt-3 bg-[#172033]"><p className="text-center mb-2 text-gray-400">No Recent Questions yet</p>
        <p className="text-gray-500 text-sm mt-1">Start solving to build momentum</p> </div>}
        {recentQuestion.map((q)=>{
          return <div key={q.id} className='bg-gray-700 rounded-lg p-3 mb-2 flex justify-between items-center'>
            <div>
              <p className='text-white font-semibold'>{q.title}</p>
              <p className='text-gray-400 text-sm'>{q.topic} • {q.platform}</p>
            </div>
            <span className={`font-bold text-sm ${difficultyColor[q.difficulty]}`}>{q.difficulty}</span>
          </div>
        })}
      </div>
    </div>
  )
}

export default Dashboard
