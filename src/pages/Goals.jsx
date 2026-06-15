import React from 'react'

const Goals = ({dailyGoal,setDailyGoal,currentSkill,setCurrentSkill,targetSkill,setTargetSkill,completedSkills,setCompletedSkills}) => {

  const addGoal = () => {
    setDailyGoal(dailyGoal+1)
  }
  const subtractGoal = () =>{
    if(dailyGoal > 0){
      setDailyGoal(dailyGoal -1)
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

  const toggleSkill = (topic)=>{
    if(completedSkills.includes(topic)){
      setCompletedSkills(completedSkills.filter((s)=>s !== topic ))
    }else{
      setCompletedSkills([...completedSkills,topic])
    }
  }

  return (
    <div className='grid grid-cols-2 gap-4 w-full'>
      <div className='col-span-2 bg-[#c1eed9] border border-[#909593] rounded-lg p-6 text-center'>
        <p className='text-gray-700 text-m font-semibold mb-1'>Daily Goal</p>
        <p className='text-gray-700 text-sm mb-4'>How many questions per day?</p>
        <div className='flex justify-center items-center gap-6'>
          <button onClick={subtractGoal} className='flex items-center justify-center text-xl text-gray-300 bg-[#306558] hover:bg-[#5a9889] rounded-lg w-10 h-10 transition-all'>-</button>
          <p className='text-gray-700 text-4xl font-bold w-12 text-center'>{dailyGoal}</p>
          <button onClick={addGoal} className=' flex items-center justify-center text-xl text-gray-300 bg-[#306558] hover:bg-[#5a9889] rounded-lg w-10 h-10 transition-all'>+</button>
        </div>
      </div>
      <div className='bg-[#c1eed9] border border-[#909593] rounded-lg p-4'>
        <p className='text-gray-700 text-lg mb-1'>Current Skill</p>
        <input type="text"
        value={currentSkill} 
        onChange={(e)=>{
          setCurrentSkill(e.target.value)
        }}
        className='w-full  border border-[#909593] rounded-lg p-3  focus:outline-none mt-2'
        />
      </div>
      <div className='bg-[#c1eed9] border border-[#909593] rounded-lg p-4'>
        <p className='text-gray-700 text-lg mb-1'>Target Skill</p>
        <input type="text"
        value={targetSkill} 
        onChange={(e)=>{
          setTargetSkill(e.target.value)
        }}
        className='w-full bg-[#c1eed9] border border-[#909593] text-gray-700 rounded-lg p-3 focus:outline-none mt-2' />
      </div>
      <div className='col-span-2 bg-[#c1eed9] border border-[#909593] rounded-lg p-4'>
        <p className='text-gray-700 text-sm mb-4'>Completed Skills</p>
        <div className=' grid grid-cols-3 gap-3'>
          {dsaTopicOrder.map((topic)=>{
            return <div key={topic} className='flex items-center gap-2'>
              <input type="checkbox" 
              checked = {completedSkills.includes(topic)}
              onChange={()=>toggleSkill(topic)}/>
              <span className='text-gray-700 text-sm'>{topic}</span>
            </div>
          })}
        </div>
        
      </div>
    </div>
  )
}

export default Goals