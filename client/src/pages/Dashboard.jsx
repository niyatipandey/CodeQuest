import React from "react";

const Dashboard = ({questions,dailyGoal,loading ,user}) => {

  const difficultyColor = {
    Easy: "text-green-700 bg-green-100",
    Medium: "text-orange-700 bg-orange-100",
    Hard: "text-red-700 bg-red-100"
  }

  const today = new Date()
  const todayDate = today.toLocaleDateString()
  const todaySolved =questions.filter((q)=>{
    if(!q.solvedAt){
      return false;
    }
    return (
      new Date(q.solvedAt).toLocaleDateString() === todayDate
    );
  }).length; 


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

  const streak = user?.streak || 0;

  if(loading){
    return <p className="text-center mt-20 text-gray-500">Loading...</p>
  }

  console.log(questions);
console.log(Array.isArray(questions));


  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5'>
      <div className="sm:col-span-3 lg:col-span-1 bg-white border border-[#d1d0cd] rounded-2xl p-6 min-h-40 flex flex-col justify-center">
        <p className='text-gray-600 text-xl font-semibold text-center' >Total Solved</p>
        <p className='text-black text-6xl md:text-5xl font-semibold mt-1 text-center'>{totalSolved}</p>
      </div>
      <div className="col-span-1 sm:col-span-3 lg:col-span-3 grid grid-cols-3 gap-3">
        <div className="bg-white border border-[#d1d0cd] rounded-2xl p-5 min-h-32 flex flex-col justify-center">
          <p className='text-gray-600 text-xl font-semibold text-center'>Easy</p>
          <p className='text-[#1D9E75] text-4xl md:text-5xl font-semibold mt-1 text-center'>{easyCount}</p>
        </div>
        <div className="bg-white border border-[#d1d0cd] rounded-2xl p-5 min-h-32 flex flex-col justify-center">
          <p className='text-gray-600 text-xl font-semibold text-center'>Medium</p>
          <p className='text-[#BA7517] text-4xl md:text-5xl font-semibold mt-1 text-center'>{mediumCount}</p>
        </div>
        <div className="bg-white border border-[#d1d0cd] rounded-2xl p-5 min-h-32 flex flex-col justify-center">
          <p className='text-gray-600 text-xl font-semibold text-center'>Hard</p>
          <p className='text-[#D85A30] text-4xl md:text-5xl font-semibold mt-1 text-center'>{hardCount}</p>
        </div>
      </div>
      <div className='col-span-1 sm:col-span-3 lg:col-span-4 rounded-2xl p-6 bg-white border border-[#d1d0cd]'>
        <p className='text-[#1D9E75] text-m font-bold'>Current Topic Focus</p>
        <p className='text-gray-600 text-2xl font-semibold mt-1'>🎯 {currentTopic || "No Topic Yet"}</p>
      </div>

      <div className='col-span-1 sm:col-span-3 lg:col-span-2 bg-white border border-[#d1d0cd] rounded-2xl p-5'>
        <p className='text-[#1D9E75] text-m font-bold mb-2'>Daily Goal Progress</p>
        <p className='text-[#636464] text-lg font-semibold'>{todaySolved} / {dailyGoal} questions</p>
        {todaySolved >= dailyGoal && <span className='text-[#1D9E75] text-m font-bold'>🎉 Goal Complete!</span>}
        <div className='w-full bg-white rounded-full h-2 mt-4 overflow-hidden'>
          <div className={`h-2 rounded-full transition-all ${todaySolved>=dailyGoal ? 'bg-[#074334]' : 'bg-[#129c7a]'}`} style={{width: `${Math.min((todaySolved/dailyGoal)*100,100)}%`}}>
          </div>
        </div>
      </div>
      <div className='col-span-1 sm:col-span-3 lg:col-span-2 bg-white border border-[#d1d0cd] rounded-2xl p-5'>
        <p className='text-[#1D9E75] text-m font-bold'>Current Streak</p>
        <p className='text-[#EA580C] text-2xl font-bold mt-1'>🔥 <span className="text-[#EA580C] text-3xl">{streak} </span>{streak === 1 ? "day" : "days"} Streak</p>
        {streak >= 7 && <p className='text-yellow-400 text-sm mt-1'>👑 Absolute consistency!</p>}
      </div>

      <div className='col-span-1 sm:col-span-3 lg:col-span-4'>
        <p className='col-span-4 text-gray-600 text-2xl font-bold mt-1 mb-2'>Recent Questions</p>
        {recentQuestion.length === 0 && <div className="border border-[#d1d0cd] rounded-2xl py-12 text-center mt-3 bg-white"><p className="text-center mb-2 text-[#103129]">No Recent Questions yet</p>
        <p className="text-[#103129] text-sm mt-1">Start solving to build momentum</p> </div>}
        {recentQuestion.map((q)=>{
          return <div key={q._id} className='bg-white rounded-xl p-4 mb-2 flex justify-between items-center border border-[#d1d0cd] hover:shadow-md transition-all duration-300'>
            <div>
              <p className='text-gray-600 font-semibold'>{q.title}</p>
              <p className='text-gray-400 text-sm'>{q.topic} • {q.platform}</p>
            </div>
            <span className={`px-4 py-2 rounded-full font-semibold text-sm inline-flex items-center justify-center ${difficultyColor[q.difficulty]}`}>{q.difficulty}</span>
          </div>
        })}
      </div>
    </div>
  )
}

export default Dashboard
