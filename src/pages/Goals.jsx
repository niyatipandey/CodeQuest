import React from 'react'
import { getAuthHeader } from '../utils/api'

const Goals = ({dailyGoal,setDailyGoal,analytics,setUser,completedSkills,setCompletedSkills}) => {

  const addGoal = async ()=>{
    try{
      const newGoal = dailyGoal+1;
      const res = await fetch('http://localhost:3000/auth/me',{
        method:'PATCH',
        headers:getAuthHeader(),
        body: JSON.stringify({dailyGoal : newGoal})
      })
      console.log(res.ok, res.status)
      if(res.ok){
        setDailyGoal(newGoal);
        setUser(prev => ({...prev, dailyGoal: newGoal}));
      }
    }catch(err){
      setDailyGoal(dailyGoal);
      console.log("Failed to update Goal",err);
    }
  }
  
    const subtractGoal = async ()=>{
      try{
      if(dailyGoal <= 1){
        return;
      }
      const newGoal = dailyGoal-1;
      const res = await fetch('http://localhost:3000/auth/me',{
        method:'PATCH',
        headers:getAuthHeader(),
        body: JSON.stringify({dailyGoal : newGoal})
      })
      if(res.ok){
        setDailyGoal(newGoal);
        setUser(prev => ({...prev, dailyGoal: newGoal}));
      }
      }catch(err){
        setDailyGoal(dailyGoal);
        console.log("Failed to update Goal",err);
      }
    }

    const completedSkill = async (skill)=>{
      try{
        let updatedSkills;
        if(completedSkills.includes(skill)){
          updatedSkills = completedSkills.filter(s => s !== skill)
        }else{
          updatedSkills = [...completedSkills,skill]
        }
      const res = await fetch('http://localhost:3000/auth/me',{
        method:'PATCH',
        headers:getAuthHeader(),
        body: JSON.stringify({completedSkills:updatedSkills})
      })
      if(res.ok){
        setCompletedSkills(updatedSkills);
        setUser(prev => ({...prev, completedSkills: updatedSkills}));
      }
      }catch(err){
        setCompletedSkills(completedSkills);
        console.log("Failed to update completed skills",err);
      }
    }

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

  const totalTopic = dsaTopicOrder.length

  const topicCount = analytics?.topicDistribution || {}

  const completedCount = completedSkills.length

  return (
    <div className='grid grid-cols-2 gap-4 w-full'>
      <div className='col-span-2 bg-[#c1eed9] border border-[#909593] rounded-lg p-6 text-center'>
        <p className='text-gray-700 text-m font-semibold mb-1'>Daily Goal</p>
        <p className='text-gray-700 text-sm mb-4'>How many questions per day?</p>
        <div className='flex justify-center items-center gap-6'>
          <button onClick={subtractGoal} className='cursor-pointer flex items-center justify-center text-xl text-gray-300 bg-[#306558] hover:bg-[#5a9889] rounded-lg w-10 h-10 transition-all'>-</button>
          <p className='text-gray-700 text-4xl font-bold w-12 text-center'>{dailyGoal}</p>
          <button onClick={addGoal} className='cursor-pointer flex items-center justify-center text-xl text-gray-300 bg-[#306558] hover:bg-[#5a9889] rounded-lg w-10 h-10 transition-all'>+</button>
        </div>
      </div>
      
      <div className='col-span-2 bg-[#c1eed9] border border-[#909593] rounded-lg p-4'>
        <p className='text-gray-700 text-sm mb-4'>Completed Skills</p>
        <div className=' grid grid-cols-3 gap-3'>
          {dsaTopicOrder.map((topic)=>{
            const count = topicCount[topic] || 0
            const color = count >= 5 ? 'text-green-600' : count >= 1 ? 'text-yellow-600' : 'text-gray-500'
              return <div key={topic} className='flex items-center gap-2'>
                <input type="checkbox" 
                checked = {completedSkills.includes(topic)}
                onChange={()=>completedSkill(topic)}/>
                <span className={`${color} font-medium text-sm`}>{topic} {count > 0 && `(${count})`}</span>
              </div>
          })}
        </div>
        <div className='flex justify-center'>
          <p className='text-md text-gray-800 '><span className='font-bold text-lg text-[#09201a]'>Mastered Topics :</span> {completedCount}/{totalTopic}</p>
        
        </div>
        
      </div>
    </div>
  )
}

export default Goals