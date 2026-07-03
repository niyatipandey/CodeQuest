import React from 'react'
import {useState , useEffect} from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Goals from './pages/Goals'
import Questions from './pages/Questions'
import Insights from './pages/Insights'
import Notes from './pages/Notes'
import AddQuestions from './pages/AddQuestions'
import {Routes , Route , Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { TbCode } from "react-icons/tb";
import { getAuthHeader } from './utils/api'
import { API_URL } from './utils/api'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [analytics, setAnayltics] = useState(null)
  const [completedSkills, setCompletedSkills] = useState(user?.completedSkills || [])
  const [loading, setLoading] = useState(false)
  const [dailyGoal, setDailyGoal] = useState(user?.dailyGoal || 2)
  const [activePage, setActivePage] = useState("dashboard")
  const [questions, setQuestions] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  
  const fetchUser = async () => {
    if(!token) return;
    const result = await fetch(`${API_URL}/auth/me`, { headers: getAuthHeader() });
    const data = await result.json();
    setUser(data);
    setCompletedSkills(data.completedSkills || []);
  }

  useEffect(() => {
    if(user?.dailyGoal){
      setDailyGoal(user?.dailyGoal);
    }
  }, [user])
  
  const fetchAnalytics = async () => {
    if(!token) return;
    try {
        const result = await fetch(`${API_URL}/analytics`, { headers: getAuthHeader() });
        const data = await result.json();
        setAnayltics(data);
    } catch(err) {
        console.error("Failed to fetch analytics", err);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchAnalytics();
  }, [token])
  
  
  
  const addQuestion= async (questionData)=>{
    const res = await fetch(`${API_URL}/question`,{
      method:'POST',
      headers:getAuthHeader(),
      body:JSON.stringify(questionData)
    })
    const newQuestion = await res.json();
    setQuestions([...questions,newQuestion])
    await fetchAnalytics()
    await fetchUser();
  }

  useEffect(() => {
    async function fetchData(){
      if(!token) return;
      setLoading(true);
      try{
      const res =await  fetch(`${API_URL}/question`,
        {
          headers:getAuthHeader()
        }
      );
      const data = await res.json();
      setQuestions(data);
      }catch(err){
        console.error("Failed to fetch error",err);
      }finally{
        setLoading(false);
      }
  } fetchData();
  }, [token]);

  const deleteQues =async (id) =>{
    await fetch(`${API_URL}/question/${id}`,{
      method:'DELETE',
      headers:getAuthHeader()
    })
    setQuestions(questions.filter(q=> q._id !== id))
    await fetchAnalytics()
    
  }

  const updateQues = async (id, data) => {
  const token = localStorage.getItem('token')
  const res = await fetch(`/api/questions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  const updated = await res.json()
  setQuestions(prev => prev.map(q => q._id === id ? updated : q))
}

  return (
    <Routes>
      <Route path='/login' element={<Login setToken={setToken}/>}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/' element={
      token ? (
        <div className='h-screen flex bg-[#F7F5F0]'>
        <div className={`flex flex-col w-60 bg-[#1C3D35] text-white p-4 fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 md:relative md:translate-x-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className=' flex items-center justify-center gap-1 text-xl mb-1 font-bold text-center'>
            <TbCode className="text-[#dcebe6]" />
            Code<span className='text-[#5df7d0]'>Quest</span>
          </div>
          <div className='text-lg mb-7 font-semi-bold text-center text-gray-300'>Track • Learn • Grow</div>
          <Sidebar setActivePage={setActivePage} activePage={activePage} user={user} setUser={setUser} setToken={setToken} setMenuOpen={setMenuOpen}/>
        </div>
        <div className='overflow-hidden'>
            <div className='flex-1 md:hidden flex p-2'>
              <button onClick={() => setMenuOpen(true)} className='text-2xl text-[#1C3D35]'>☰</button>
            </div>
          </div>
        <div className='flex-1 bg-[#F7F5F0] text-white p-6 overflow-y-auto'>
          {activePage === "dashboard" && <Dashboard questions={questions} dailyGoal={dailyGoal} loading={loading} user={user}/>}
          {activePage ==="analytics" && <Analytics analytics={analytics}/>}
          {activePage === "goals" && <Goals dailyGoal={dailyGoal} setDailyGoal={setDailyGoal} questions={questions}  analytics={analytics} setUser={setUser} completedSkills={completedSkills} setCompletedSkills={setCompletedSkills}/>}
          {activePage === "questions" && <Questions questions={questions} deleteQues={deleteQues} loading={loading} updateQues={updateQues}/>}
          {activePage === "insights" && <Insights questions={questions} analytics={analytics} user={user}/>}
          {activePage === "notes" && <Notes questions={questions}/>}
          {activePage === "addQuestions" && <AddQuestions addQuestion={addQuestion}/>}
        </div>
        {menuOpen && (
            <div 
                className='fixed inset-0 bg-black/50 z-40 md:hidden' 
                onClick={() => setMenuOpen(false)}
            />
        )}
      </div>
      ) : <Navigate to='/login' />
    }
      />
    </Routes>
  )
}

export default App