import React from 'react'

const Notes = ({questions}) => {

  const notesQuestions = questions.filter((q) => q.notes && q.notes.trim() !== "")

  const difficultyColor = {
    Easy: "text-green-400",
    Medium: "text-yellow-400",
    Hard: "text-red-400"
  }
  return (
    <div>
      {notesQuestions.length === 0 && <p className='text-gray-500 text-center mt-20'>No notes yet. Add notes when solving questions!</p>}
      <h1 className='text-2xl font-bold text-white mb-6'>Notes Vault 📓</h1>
      {notesQuestions.map((q)=>{
        return <div key={q.id} className='bg-gray-800 rounded-lg p-4 mb-3 flex justify-between'>
            <div>
            <p className='text-white font-semibold'>{q.title}</p>  
            <p className='text-sm text-gray-400'>{q.notes}</p>
            </div>
            <div className='text-right'>
              <span className={`font-bold ${difficultyColor[q.difficulty]}`}>{q.difficulty}</span>
              <p className='text-lg font-bold text-white'>{q.topic}</p>
            </div>
          </div>
      })}
    </div>
  )
}

export default Notes