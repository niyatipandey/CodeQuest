import React from 'react'


const Insights = ({questions}) => {

  const total = questions.length
  const avgTime = total>0 ?   Math.round(questions.reduce((sum,q)=>{
    return (sum + Number(q.timeTaken))},0))/total : 0

  const avgTimeInsight = avgTime > 30 ? "You're spending too long per question" : avgTime<10 ? "Solving very fast — are you sure you understand?" : "Impressive speed"

  const topicCount = {}
  questions.forEach((q)=>{
    topicCount[q.topic] = (topicCount[q.topic] || 0) +1
  })

  const leastTouchedTopic = Object.entries(topicCount).sort((a,b) => a[1]- b[1])[0]?.[0]

  
  const dsaTopicOrder = [
  "Arrays",           
  "Strings",          
  "Two Pointers",     
  "Sliding Window",   
  "Binary Search",    
  "Linked List",      
  "Stacks & Queues",  
  "Trees",            
  "Heaps",            
  "Greedy",           
  "Backtracking",     
  "Graphs",           
  "DP",               
  "Tries"             
  ]

  const neglectedTopic = dsaTopicOrder.filter(topic => !topicCount[topic])
  const neglectedTopicInsight = neglectedTopic.length > 0 ? `Focus needed on ${neglectedTopic.slice(0,2).join(', ')}` : "Great coverage of all Topics" 

  const comfortTopic= Object.entries(topicCount).filter(([topic,count]) => count > 15).map(([topic])=> topic)

  const comfortTopicInsight = comfortTopic.length > 0 ? `You look quite comfortable with ${comfortTopic[0]} — consider moving forward!`:null

  const todayDate = new Date()
  const today = todayDate.toLocaleDateString()
  const consistency = questions.filter((q)=> q.dateSolved === today).length

  const todayInsight = consistency === 0 ? "📅 Not too late to be back!!" : consistency === 1 ? "✅ 1 question done — Keep going:)" : `💪 ${consistency} questions today — Push yourself better!!`

  const uniqueDates = [...new Set(questions.map((q)=>q.dateSolved))]

  let streak = 0

  for(let i =0 ; i< uniqueDates.length; i++){
    const checkDate = new Date(todayDate)
    checkDate.setDate(todayDate.getDate()-i)

    if(uniqueDates.includes(checkDate.toLocaleDateString())) {
      streak++;
    }else{
      break;
    }
  }

  const consistencyInsight = streak === 0 ? "⚠️ No activity today — even 1 question counts!" : streak < 3 ?  `🔥 ${streak} day streak — keep going!` : streak < 7 ? `🚀 ${streak} day streak — you're building a habit!`
  : `👑 ${streak} day streak — absolute consistency!`

  const hardCount = questions.filter((q)=> q.difficulty === 'Hard').length

  const hardPercentage = total > 0 ? Math.round((hardCount/total)*100) : 0

  const hardInsight = hardPercentage < 20 ? "💀 You're avoiding hard questions" : "💪 Good balance of hard questions"

  const watchedCount = questions.filter((q) => q.helpTaken === 'Watched Solution').length
  const watchedPercentage = total > 0 ? Math.round((watchedCount/total)*100) : 0
  const helpInsight = watchedPercentage > 30 ? "📉 Too many watched solutions" : "✅ Good independence"

  const insightCards = [
    {icon:"🔥", title: "Consistency" , message:consistencyInsight, color: "border-orange-500" },
    {icon:"📅", title: "Today's Activity" , message: todayInsight, color: "border-blue-500" },
    {icon:"📊", title: "Topic Coverage" , message: neglectedTopicInsight, color: "border-yellow-500" },
    {icon:"🎯", title: "Least Touched" , message: `Give more attention to: ${leastTouchedTopic || "N/A"}`, color: "border-red-500" },
    {icon:"⏱️", title: "Speed Analysis" , message: avgTimeInsight, color: "border-purple-500" },
    {icon:"💀", title: "Difficulty Balance" , message: hardInsight, color: "border-red-400" },
    {icon:"📉", title: "Help Dependency" , message: helpInsight, color: "border-pink-500" },
    comfortTopicInsight && { icon: "✅", title: "Topic Mastery", message: comfortTopicInsight, color: "border-green-500" }
  ].filter(Boolean)


  return (
    <div className='max-w-3xl mx-auto'>
      <h1 className='text-2xl font-bold text-white mb-6'>🧠 Insights</h1>
        <div className='grid grid-cols-2 gap-4'>
          {insightCards.map((card,index) =>(
            <div key={index} className={`bg-gray-800 rounded-lg p-5 border-l-4 ${card.color}`}>
              <p className='text-gray-400 text-sm mb-1'>{card.icon} {card.title}</p>
              <p className='text-white text-lg font-semibold'>{card.message}</p>
              </div>
          ))}
        </div>
    </div>
  )
}

export default Insights