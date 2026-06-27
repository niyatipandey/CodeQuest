import React from 'react'
import {FaTrash} from 'react-icons/fa'

const Questions = ({questions,deleteQues,loading}) => {

  const difficultyColor = {
    Easy: "text-green-700 bg-green-100",
    Medium: "text-orange-700 bg-orange-100",
    Hard: "text-red-700 bg-red-100"
  }
  if(loading){
    return <p className="text-center mt-20 text-gray-500">Loading...</p>
  }
  return (
    <div className='max-w-4xl mx-auto'>
      
      <h1 className='text-2xl font-bold text-[#1C3D35] mb-6'>Questions</h1>
      {questions.map((question)=>{
        return <div key={question._id} className='bg-[#d1f2e3] rounded-xl p-4 mb-3 flex justify-between items-center hover:shadow-md transition duration-200'>
          <div>
            <h2 className='text-[#184C40] font-semibold'>{question.title}</h2>
            <p className='text-[#6B7F78] text-sm mt-1'>{question.topic} • {question.platform} • {new Date(question.solvedAt).toLocaleDateString()}</p>
            <p className='text-[#6B7F78] text-sm mt-1'>Help: {question.helpTaken} • Time: {question.timeTaken} mins</p>
          </div>
          <div className='text-right'>
            <div>
             <button
             className='group cursor-pointer'
             onClick={()=>{
              deleteQues(question._id)
            }}><FaTrash className="text-gray-600 group-hover:text-red-600 text-xl"/></button>
            </div>
            <div className={`px-4 py-2 rounded-full font-semibold text-sm inline-flex items-center  ${difficultyColor[question.difficulty]}`}>{question.difficulty}</div>
            <p className='text-[#6B7F78] text-sm mt-1'>Solved: {question.status}</p>
          </div>
        </div>
      })}
      {questions.length === 0 && <p className='text-gray-500 text-center mt-20'>No questions yet. Add your first one!</p>}
    </div>
  )
}

export default Questions