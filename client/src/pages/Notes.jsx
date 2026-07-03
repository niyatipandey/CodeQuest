import React from 'react'

const Notes = ({questions}) => {

  const notesQuestions = questions.filter((q) => q.notes && q.notes.trim() !== "")

  const difficultyColor = {
    Easy: "text-green-700 bg-green-100",
    Medium: "text-orange-700 bg-orange-100",
    Hard: "text-red-700 bg-red-100"
  }
  return (
    <div className="px-2 sm:px-4">
      <h1 className="text-3xl font-bold text-[#1C3D35] mb-6">Notes Vault 📓</h1>
      {notesQuestions.length === 0 && <p className='text-gray-700 text-center mt-20'>No notes yet. Add notes when solving questions!</p>}
      {notesQuestions.map((q)=>{
        return <div key={q._id} className="bg-[#d1f2e3] rounded-2xl p-4 mb-3 hover:shadow-md transition-all duration-300 flex flex-col gap-2">
          <div className="flex justify-between items-start gap-2">
            <p className="text-[#184C40] text-lg font-medium flex-1">{q.title}</p>
            <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${difficultyColor[q.difficulty]}`}>{q.difficulty}</span>
          </div>
          <div className="h-px bg-[#a8dfc4]" />
          <p className="text-[#3d5c52] text-sm leading-relaxed line-clamp-3">{q.notes}</p>
          <div className="flex justify-end">
            <span className="text-xs font-medium text-[#1a6b50] bg-[#a8dfc4] px-3 py-1 rounded-full">{q.topic}</span>
          </div>
        </div>
      })}
    </div>
  )
}

export default Notes
