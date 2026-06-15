import React from 'react'

const Notes = ({questions}) => {

  const notesQuestions = questions.filter((q) => q.notes && q.notes.trim() !== "")

  const difficultyColor = {
    Easy: "text-green-700 bg-green-100",
    Medium: "text-orange-700 bg-orange-100",
    Hard: "text-red-700 bg-red-100"
  }
  return (
    <div>
      <h1 className='text-2xl font-bold text-[#1C3D35] mb-6'>Notes Vault 📓</h1>
      {notesQuestions.length === 0 && <p className='text-gray-700 text-center mt-20'>No notes yet. Add notes when solving questions!</p>}
      {notesQuestions.map((q)=>{
        return <div key={q.id} className='bg-[#c1eed9] border border-[#909593] rounded-lg p-4 mb-3 flex justify-between'>
            <div>
            <p className='text-[#1C3D35] font-semibold'>{q.title}</p>  
            <p className='text-sm mt-2 text-gray-700'>{q.notes}</p>
            </div>
            <div className='text-right'>
              <span className={`px-4 py-2 rounded-full font-semibold text-sm inline-flex justify-center items-center  ${difficultyColor[q.difficulty]}`}>{q.difficulty}</span>
              <p className='text-lg font-bold text-[#153b3b] mt-1'>{q.topic}</p>
            </div>
          </div>
      })}
    </div>
  )
}

export default Notes