import React from 'react'
import {useState} from 'react'

const AddQuestions = ({addQuestion}) => {

  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    title:"",
    platform:"",
    difficulty:"",
    topic:"",
    status:"unsolved",
    helpTaken:"No Help",
    timeTaken:"",
    notes:"",
    solvedAt: new Date().toISOString(),
  })

  const handleSubmit = ()=>{

    if(!formData.title){
      setError("Please enter question title")
      return
    }
    if(!formData.difficulty){
      setError("Select difficulty")
      return
    }
    if(!formData.topic){
      setError("Select topic")
      return
    }
    setError("");
    addQuestion(formData)
    setFormData({title:"",
    platform:"",
    difficulty:"",
    topic:"",
    status:"unsolved",
    helpTaken:"No Help",
    timeTaken:"",
    notes:"",
    solvedAt:new Date().toISOString(),
    })
  }


  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4 overflow-hidden">
      <h1 className='text-3xl font-bold text-[#1C3D35] mb-6'>Add New Question</h1>
      <input className=' hover:border-[#1D5B4F] w-full bg-[#d1f2e3]  text-gray-600 rounded-xl p-3 border border-[#7fb29a] focus:outline-none mb-4 focus:ring-2 focus:ring-[#1D9E75]'
      type="text" 
      value = {formData.title}
      placeholder='Question Title...'
      onChange={(e)=>{
        setFormData({...formData,title : e.target.value})
      }
      }/>
      <input className=' hover:border-[#1D5B4F] w-full bg-[#d1f2e3] text-gray-600 rounded-xl p-3 border border-[#7fb29a] focus:outline-none mb-4 focus:ring-2 focus:ring-[#1D9E75]'
      type="number" 
      value = {formData.timeTaken}
      placeholder='Time Taken'
      onChange={(e)=>{
        setFormData({...formData,timeTaken : e.target.value})
      }
      }/>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <select className="hover:border-[#1D5B4F] w-full bg-[#d1f2e3]  text-gray-600 rounded-xl p-3 border border-[#7fb29a] focus:outline-none mb-4 focus:ring-2 focus:ring-[#1D9E75]"
        value={formData.difficulty}
        onChange={(e)=> setFormData({...formData, difficulty:e.target.value})}>
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option> 
          <option value="Hard">Hard</option>       
        </select>
        <select className="hover:border-[#1D5B4F] w-full bg-[#d1f2e3]  text-gray-600 rounded-xl p-3 border border-[#7fb29a] focus:outline-none mb-4 focus:ring-2 focus:ring-[#1D9E75]"
      value={formData.topic}
      onChange={(e)=> setFormData({...formData, topic:e.target.value})}>
        <option value="">Select Topic</option>
        <option value="Arrays">Arrays</option>
        <option value="Strings">Strings</option>
        <option value="Two Pointers">Two Pointers</option>
        <option value="Sliding Window">Sliding Window</option>
        <option value="Binary Search">Binary Search</option>
        <option value="Linked List">Linked List</option>
        <option value="Stacks & Queues">Stacks & Queues</option>
        <option value="Trees">Trees</option>
        <option value="Heaps">Heaps</option>
        <option value="Greedy">Greedy</option>
        <option value="Backtracking">Backtracking</option>
        <option value="Graphs">Graphs</option>
        <option value="DP">DP</option>
        <option value="Tries">Tries</option>   
      </select>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <select className="hover:border-[#1D5B4F] w-full bg-[#d1f2e3]  text-gray-600 rounded-xl p-3 border border-[#7fb29a] focus:outline-none mb-4 focus:ring-2 focus:ring-[#1D9E75]"
        value={formData.platform}
        onChange={(e)=> setFormData({...formData, platform:e.target.value})}>
          <option value="">Select Platform</option>
          <option value="Leetcode">Leetcode</option>
          <option value="GFG">GFG</option> 
          <option value="Codeforces">Codeforces</option>       
        </select>
        <select className="hover:border-[#1D5B4F] w-full bg-[#d1f2e3]  text-gray-600 rounded-xl p-3 border border-[#7fb29a] focus:outline-none mb-4 focus:ring-2 focus:ring-[#1D9E75]"
        value={formData.helpTaken}
        onChange={(e)=> setFormData({...formData, helpTaken:e.target.value})}>
          <option value="No Help">No Help</option>
          <option value="Help Taken">Help Taken</option>
          <option value="Watched Solution">Watched Solution</option>      
        </select>
      </div>
      <select className="hover:border-[#1D5B4F] w-full bg-[#d1f2e3]  text-gray-600 rounded-xl p-3 border border-[#7fb29a] focus:outline-none mb-4 focus:ring-2 focus:ring-[#1D9E75]"
      value={formData.status}
      onChange={(e)=> setFormData({...formData, status:e.target.value})}>
        <option value="solved">Solved</option>
        <option value="unsolved">Unsolved</option>     
      </select>
      <textarea className="hover:border-[#1D5B4F] w-full bg-[#d1f2e3]  text-gray-600 rounded-xl p-3 border border-[#7fb29a] focus:outline-none mb-4 h-32"
      value={formData.notes}
      placeholder="Write your notes, patterns, mistakes..."
      onChange={(e)=>{
        setFormData({...formData, notes:e.target.value})
      }}></textarea>

      {error && <div className='bg-red-500/10 border border-red-500 rounded-xl p-2 mb-2'>
       <p className='text-red-500 text-sm'>⚠️ {error}</p>
      </div>}
      <button className='w-full bg-[#1C3D35] hover:bg-[#356d5f] text-white font-bold py-4 rounded-xl transition-all cursor-pointer'
      onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default AddQuestions