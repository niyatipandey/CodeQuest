import React from 'react'
import { LayoutDashboard, List, PlusCircle, Target, BarChart2, BookOpen, Lightbulb } from 'lucide-react'

const Sidebar = ({setActivePage,activePage}) => {
  return (
    <div className='flex flex-col'>
        <button className='flex items-center gap-3 text-left px-4 py-2 rounded-lg text-gray-400 hover:bg-[#1D9E75] transition-all hover:text-white'
        onClick={()=>
            setActivePage("dashboard")}
        ><LayoutDashboard size={16} /> Dashboard</button>
        <button className='flex items-center gap-3
        text-left px-4 py-2 rounded-lg text-gray-400 hover:bg-[#1D9E75] transition-all hover:text-white'
        onClick={()=>
            setActivePage("questions")}
        ><List size={16} /> Questions</button>
        <button className='flex items-center gap-3
        text-left px-4 py-2 rounded-lg text-gray-400 hover:bg-[#1D9E75] transition-all hover:text-white'
        onClick={()=>
            setActivePage("addQuestions")}
        ><PlusCircle size={16} /> AddQuestion</button>
        <button className='flex items-center gap-3
        text-left px-4 py-2 rounded-lg text-gray-400 hover:bg-[#1D9E75] transition-all hover:text-white'
        onClick={()=>
            setActivePage("goals")}
        ><Target size={16} /> Goals</button>
        <button className='flex items-center gap-3
        text-left px-4 py-2 rounded-lg text-gray-400 hover:bg-[#1D9E75] transition-all hover:text-white'
        onClick={()=>
            setActivePage("analytics")}
        ><BarChart2 size={16} /> Analytics</button>
        <button className='flex items-center gap-3
        text-left px-4 py-2 rounded-lg text-gray-400 hover:bg-[#1D9E75] transition-all hover:text-white'
        onClick={()=>
            setActivePage("notes")}
        ><BookOpen size={16} /> Notes</button>
        <button className='flex items-center gap-3
        text-left px-4 py-2 rounded-lg text-gray-400 hover:bg-[#1D9E75] transition-all hover:text-white'
        onClick={()=>
            setActivePage("insights")}
        ><Lightbulb size={16} /> Insights</button>
      </div>
  )
}

export default Sidebar