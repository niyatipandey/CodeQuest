import React from 'react'

const Questions = ({questions}) => {

  const difficultyColor = {
    Easy: "text-green-700 bg-green-100",
    Medium: "text-orange-700 bg-orange-100",
    Hard: "text-red-700 bg-red-100"
  }
  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold text-[#1C3D35] mb-6'>Questions</h1>
      {questions.map((question)=>{
        return <div key={question.id} className='bg-[#d1f2e3] rounded-xl p-4 mb-3 flex justify-between items-center hover:shadow-md transition duration-200'>
          <div>
            <h2 className='text-[#184C40] font-semibold'>{question.title}</h2>
            <p className='text-[#6B7F78] text-sm mt-1'>{question.topic} • {question.platform} • {question.dateSolved}</p>
            <p className='text-[#6B7F78] text-sm mt-1'>Help: {question.helpTaken} • Time: {question.timeTaken} mins</p>
          </div>
          <div className='text-right'>
            <span className={`px-4 py-2 rounded-full font-semibold text-sm inline-flex items-center  ${difficultyColor[question.difficulty]}`}>{question.difficulty}</span>
            <p className='text-[#6B7F78] text-sm mt-1'>Solved: {question.solved}</p>
          </div>
        </div>
      })}
      {questions.length === 0 && <p className='text-gray-500 text-center mt-20'>No questions yet. Add your first one!</p>}
    </div>
  )
}

export default Questions