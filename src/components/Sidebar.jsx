import React from 'react'
import { LayoutDashboard, List, PlusCircle, Target, BarChart2, BookOpen, Lightbulb } from 'lucide-react'

const Sidebar = ({setActivePage,activePage}) => {

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "questions", label: "Questions", icon: List },
        { id: "addQuestions", label: "Add Question", icon: PlusCircle },
        { id: "goals", label: "Goals", icon: Target },
        { id: "analytics", label: "Analytics", icon: BarChart2 },
        { id: "notes", label: "Notes", icon: BookOpen },
        { id: "insights", label: "Insights", icon: Lightbulb },
    ];

  return (
    <div className='flex flex-col'>
        {menuItems.map((item) => {
            const Icon = item.icon;
            return (
            <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all
                ${
                activePage === item.id
                    ? "bg-[#1D9E75] text-white shadow-md"
                    : "text-gray-400 hover:bg-[#1D9E75] hover:text-white"
                }`}
            >
                <Icon size={16} />
                {item.label}
            </button>
            );
        })}
      </div>
  )
}

export default Sidebar