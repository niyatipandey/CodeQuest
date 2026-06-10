import React from 'react'

const Questions = ({questions}) => {

  const difficultyColor = {
    Easy: "text-green-400",
    Medium: "text-yellow-400",
    Hard: "text-red-400"
  }
  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-2xl font-bold text-white mb-6'>Questions</h1>
      {questions.map((question)=>{
        return <div key={question.id} className='bg-gray-800 rounded-xl p-4 mb-3 flex justify-between items-center'>
          <div>
            <h2 className='text-white font-semibold'>{question.title}</h2>
            <p className='text-gray-400 text-sm mt-1'>{question.topic} • {question.platform} • {question.dateSolved}</p>
            <p className='text-gray-400 text-sm mt-1'>Help: {question.helpTaken} • Time: {question.timeTaken} mins</p>
          </div>
          <div className='text-right'>
            <span className={`font-bold ${difficultyColor[question.difficulty]}`}>{question.difficulty}</span>
            <p className='text-gray-400 text-sm mt-1'>Solved: {question.solved}</p>
          </div>
        </div>
      })}
      {questions.length === 0 && <p className='text-gray-500 text-center mt-20'>No questions yet. Add your first one!</p>}
    </div>
  )
}

export default Questions