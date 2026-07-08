import React, { useState, useEffect } from 'react'

const EditModal = ({ question, onClose, onSave }) => {
  const [form, setForm] = useState({
    title: '',
    topic: '',
    platform: '',
    difficulty: 'Easy',
    status: 'unsolved',
    notes: '',
    timeTaken: '',
    helpTaken: 'No Help',
  })

  useEffect(() => {
    if (question) {
      setForm({
        title: question.title || '',
        topic: question.topic || '',
        platform: question.platform || '',
        difficulty: question.difficulty || 'Easy',
        status: question.status || 'unsolved',
        notes: question.notes || '',
        timeTaken: question.timeTaken || '',
        helpTaken: question.helpTaken || 'No Help',
      })
    }
  }, [question])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    const changed ={};
    if (Object.keys(changed).length === 0) {
      onClose();
      return;
    }
    Object.keys(form).forEach(key =>{
      if(form[key] !== question[key]) {
        changed[key] = form[key];
      }
    })
    onSave(question._id, changed)
  }

  if (!question) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md flex flex-col gap-4 shadow-xl">
        <h2 className="text-[#1C3D35] text-lg font-semibold">Edit question</h2>

        <input name="title" value={form.title} onChange={handleChange}
          placeholder="Title"
          className=" text-[#164838] border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1a6b50]" />

        <input name="topic" value={form.topic} onChange={handleChange}
          placeholder="Topic"
          className="text-[#164838] border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1a6b50]" />

        <input name="platform" value={form.platform} onChange={handleChange}
          placeholder="Platform"
          className="text-[#164838] border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1a6b50]" />

        <div className="flex gap-3">
          <select name="difficulty" value={form.difficulty} onChange={handleChange}
            className="text-[#164838] flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1a6b50]">
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <select name="status" value={form.status} onChange={handleChange}
            className="text-[#164838] flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1a6b50]">
            <option value="unsolved">Unsolved</option>
            <option value="solved">Solved</option>
          </select>
        </div>

        <input name="timeTaken" value={form.timeTaken} onChange={handleChange}
          placeholder="Time taken (mins)"
          type="number"
          className="text-[#164838] border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1a6b50]" />

        <select name="helpTaken" value={form.helpTaken} onChange={handleChange}
          className="text-[#164838] border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1a6b50]">
          <option>No Help</option>
          <option>Help Taken</option>
          <option>Watched Solution</option>
        </select>

        <textarea name="notes" value={form.notes} onChange={handleChange}
          placeholder="Notes"
          rows={3}
          className="text-[#164838] border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1a6b50] resize-none" />

        <div className="flex gap-3 justify-end mt-1">
          <button onClick={onClose}
            className="cursor-pointer px-4 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit}
            className="cursor-pointer  px-4 py-2 rounded-xl text-sm bg-[#1C3D35] text-white hover:bg-[#153028] transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditModal