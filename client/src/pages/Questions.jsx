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
    <div className='max-w-5xl mx-auto px-2 sm:px-4'>
      
      <h1 className='text-3xl font-bold text-[#1C3D35] mb-6'>Questions</h1>
      {questions.map((question)=>{
        return <div key={question._id} className="bg-[#d1f2e3] rounded-2xl p-5 md:p-6 mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:shadow-md transition-all duration-300">
          <div className="w-full">
            <h2 className="text-[#184C40] text-xl md:text-2xl font-bold text-center mb-4">{question.title}</h2>
            <div className="space-y-2 text-sm text-[#6B7F78]">
              <div className="flex justify-between">
                <span>{question.topic}</span>
                <span>{question.platform}</span>
              </div>
              <div className="flex justify-between">
                <span>{new Date(question.solvedAt).toLocaleDateString()}</span>
                <span>{question.timeTaken} mins</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4 w-full sm:w-auto'>
            <div className="flex justify-between items-center">
              <span
                className={`px-4 py-2 rounded-full font-semibold text-sm ${difficultyColor[question.difficulty]}`}>{question.difficulty}</span>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold capitalize">{question.status}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#6B7F78]">{question.helpTaken}</span>
                <button
                className="group cursor-pointer"
                onClick={() => deleteQues(question._id)}
              >
              <FaTrash className="text-xl text-gray-600 group-hover:text-red-600 transition-colors" />
              </button>
            </div>
        </div>
      </div>
      })}
      {questions.length === 0 && <p className='text-gray-500 text-center mt-20'>No questions yet. Add your first one!</p>}
    </div>
  )
}

export default Questions