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

const App = () => {

  const getAuthHeader = ()=>({
    'Content-type' : 'application/json',
    'Authorization' : `Bearer ${localStorage.getItem('token')}`
  })

  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [analytics, setAnayltics] = useState(null)
  const [completedSkills, setCompletedSkills] = useState([])
  const [currentSkill, setCurrentSkill] = useState("")
  const [targetSkill, setTargetSkill] = useState("")
  const [loading, setLoading] = useState(false)
  const [dailyGoal, setDailyGoal] = useState(2)
  const [activePage, setActivePage] = useState("dashboard")
  const [questions, setQuestions] = useState([])
  
  useEffect(() => {
    async function fetchUser(){
      if(!token){
        return;
      }
      const result = await fetch("http://localhost:3000/auth/me",{
        headers:getAuthHeader()
      });

      const data = await result.json();
      setUser(data);
    }
    fetchUser();
  }, [token])

  useEffect(() => {
    async function getAnalysis(){
      if(!token){
        return;
      }
      try{
        const result = await fetch('http://localhost:3000/analytics',{
          headers :getAuthHeader()
        })
        const data = await result.json();
        setAnayltics(data);
      }catch(err){
        console.error("Failed to fetch analytics", err);
      }
    }
    getAnalysis();
  }, [token])
  

  useEffect(() => {
    const complete = localStorage.getItem('completedSkills')
    if(complete) setCompletedSkills(JSON.parse(complete))
  }, [])
  
  useEffect(() => {
    localStorage.setItem('completedSkills',JSON.stringify(completedSkills))
  }, [completedSkills])
  

  useEffect(() => {
    const currentSkl = localStorage.getItem('currentSkill')
    if(currentSkl) setCurrentSkill(currentSkl)
  
  }, [])

  useEffect(() => {
    localStorage.setItem('currentSkill' , currentSkill)
  }, [currentSkill])
  
 useEffect(() => {
    const targetSkl = localStorage.getItem('targetSkill')
    if(targetSkl) setTargetSkill(targetSkl)
  
  }, [])

  useEffect(() => {
    localStorage.setItem('targetSkill' , targetSkill)
  }, [targetSkill])
  

  useEffect(() => {
    const saved = localStorage.getItem('dailyGoal')
    if(saved) setDailyGoal(Number(saved))
}, [])

useEffect(() => {
    localStorage.setItem('dailyGoal', dailyGoal)
}, [dailyGoal])

  const addQuestion= async (questionData)=>{
    const res = await fetch('http://localhost:3000/question',{
      method:'POST',
      headers:getAuthHeader(),
      body:JSON.stringify(questionData)
    })
    const newQuestion = await res.json();
    setQuestions([...questions,newQuestion])
  }

  useEffect(() => {
    async function fetchData(){
      if(!token) return;
      setLoading(true);
      try{
      const res =await  fetch('http://localhost:3000/question',
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
    await fetch(`http://localhost:3000/question/${id}`,{
      method:'DELETE',
      headers:getAuthHeader()
    })
    setQuestions(questions.filter(q=> q._id !== id))
    
  }

  return (
    <Routes>
      <Route path='/login' element={<Login setToken={setToken}/>}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/' element={
      token ? (
        <div className='h-screen flex bg-[#F7F5F0]'>
        <div className=' flex flex-col w-60 bg-[#1C3D35]  text-white p-4 '>
          <div className=' flex items-center justify-center gap-1 text-xl mb-1 font-bold text-center'>
            <TbCode className="text-[#dcebe6]" />
            Code<span className='text-[#5df7d0]'>Quest</span>
          </div>
          <div className='text-lg mb-7 font-semi-bold text-center text-gray-300'>Track • Learn • Grow</div>
          <Sidebar setActivePage={setActivePage} activePage={activePage}/>
        </div>
        <div className='flex-1 bg-[#F7F5F0]text-white p-6 overflow-y-auto'>
          {activePage === "dashboard" && <Dashboard questions={questions} dailyGoal={dailyGoal} loading={loading} user={user}/>}
          {activePage ==="analytics" && <Analytics analytics={analytics}/>}
          {activePage === "goals" && <Goals dailyGoal={dailyGoal} setDailyGoal={setDailyGoal} currentSkill={currentSkill} setCurrentSkill={setCurrentSkill} targetSkill={targetSkill} setTargetSkill={setTargetSkill} completedSkills={completedSkills} setCompletedSkills={setCompletedSkills}/>}
          {activePage === "questions" && <Questions questions={questions} deleteQues={deleteQues} loading={loading}/>}
          {activePage === "insights" && <Insights questions={questions}/>}
          {activePage === "notes" && <Notes questions={questions}/>}
          {activePage === "addQuestions" && <AddQuestions addQuestion={addQuestion}/>}
        </div>
      </div>
      ) : <Navigate to='/login' />
    }
      />
    </Routes>
  )
}

export default App