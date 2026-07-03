import React ,{ useState }  from 'react'
import { FaEdit, FaTrash} from 'react-icons/fa'
import EditModal from '../components/EditModal'

const Questions = ({ questions, deleteQues, loading,updateQues }) => {
  const [editingQuestion, setEditingQuestion] = useState(null)

  const difficultyColor = {
    Easy: "text-green-700 bg-green-100",
    Medium: "text-orange-700 bg-orange-100",
    Hard: "text-red-700 bg-red-100"
  }

  if (loading) {
    return <p className="text-center mt-20 text-gray-500">Loading...</p>
  }

  return (
    <>
     <EditModal
        question={editingQuestion}
        onClose={() => setEditingQuestion(null)}
        onSave={(id, data) => {
          updateQues(id, data)
          setEditingQuestion(null)
        }}
      />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {questions.map((question) => (
      <div key={question._id} className="bg-[#d1f2e3] rounded-2xl p-4 flex flex-col gap-2.5 hover:shadow-md transition-all duration-300">
        <h2 className="text-[#184C40] text-[15px] font-medium text-center">{question.title}</h2>
        <div className="h-px bg-[#a8dfc4]" />
        <div className="flex justify-between text-xs text-[#5a7269]">
          <span>{question.topic}</span>
          <span>{question.platform || "—"}</span>
        </div>
        <div className="flex justify-between text-xs text-[#5a7269]">
          <span>{new Date(question.solvedAt).toLocaleDateString()}</span>
          <span>{question.timeTaken ? `${question.timeTaken} mins` : "—"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor[question.difficulty]}`}>{question.difficulty}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${question.status === 'solved' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-orange-50 text-orange-700 border-orange-300'}`}>{question.status}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-[#6b7f78]">{question.helpTaken}</span>
          <div className="flex gap-2">
            <button onClick={() => setEditingQuestion(question._id)} className="cursor-pointer text-[#6b7f78] hover:text-[#1a6b50] transition-colors"><FaEdit className="text-sm" /></button>
            <button onClick={() => deleteQues(question._id)} className="cursor-pointer text-[#6b7f78] hover:text-red-600 transition-colors"><FaTrash className="text-sm" /></button>
          </div>
        </div>
      </div>
    ))}
  </div>
</>
);
}

export default Questions