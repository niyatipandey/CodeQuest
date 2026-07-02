import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, List, PlusCircle, Target, BarChart2, BookOpen, Lightbulb ,UserCircle2} from 'lucide-react'
import { Link } from "react-router-dom";

const Sidebar = ({setActivePage,activePage,user}) => {

    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    
    const handleLogout= ()=>{
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        setOpen(false);
        navigate('/login')

    }

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
    <div className='relative h-screen flex flex-col'>
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
        <div className="absolute bottom-4 left-4">
        <UserCircle2  
        size={28}
        className="cursor-pointer"
        onClick={() => setOpen(!open)}/>
        {open && (
            <div className="absolute bottom-10 left-0 w-50 rounded-xl bg-transparent border border-gray-700 shadow-lg p-4">
                <div className="font-semibold">{user?.name}</div>
                <div className="text-sm text-gray-400">{user?.email}</div>
                <hr className="my-3 border-gray-700"/>
                <Link to="/login" className='cursor-pointer w-full text-left text-red-500 hover:text-red-400'>LogOut</Link>
            </div>
        )}
        </div>
        


      </div>
  )
}

export default Sidebar