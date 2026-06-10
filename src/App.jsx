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

const App = () => {

  const [completedSkills, setCompletedSkills] = useState([])

  const [currentSkill, setCurrentSkill] = useState("")
  const [targetSkill, setTargetSkill] = useState("")

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
  
   
  

  const [dailyGoal, setDailyGoal] = useState(5)

  useEffect(() => {
    const savedGoal = localStorage.getItem('dailyGoal')
    if(savedGoal) setDailyGoal(Number(savedGoal))
  }, [])
  
  useEffect(() => {
    localStorage.setItem('dailyGoal' , dailyGoal)
  }, [dailyGoal])
  

  const [activePage, setActivePage] = useState("dashboard")

  const [questions, setQuestions] = useState([])

  const addQuestion= (questionData)=>{
    const id = Date.now();
    const dateSolved = new Date().toLocaleDateString()
    const newQuestion = {...questionData,id,dateSolved}
    setQuestions([...questions,newQuestion])
  }

  useEffect(() => {
    const saved = localStorage.getItem('questions');
    if(saved) {
      setQuestions(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('questions',JSON.stringify(questions))
  }, [questions])

  return (
      <div className='h-screen flex bg-gray-950'>
        <div className=' flex flex-col w-60 bg-gray-900  text-white p-4 '>
          <div className='text-xl mb-1 font-bold text-center'>CodeQuest🚀</div>
          <div className='text-lg mb-7 font-semi-bold text-center text-gray-300'>Track • Learn • Grow</div>
          <Sidebar setActivePage={setActivePage} activePage={activePage}/>
        </div>
        <div className='flex-1 bg-gray-950 text-white p-6 overflow-y-auto'>
          {activePage === "dashboard" && <Dashboard questions={questions} dailyGoal={dailyGoal}/>}
          {activePage ==="analytics" && <Analytics questions={questions}/>}
          {activePage === "goals" && <Goals dailyGoal={dailyGoal} setDailyGoal={setDailyGoal} currentSkill={currentSkill} setCurrentSkill={setCurrentSkill} targetSkill={targetSkill} setTargetSkill={setTargetSkill} completedSkills={completedSkills} setCompletedSkills={setCompletedSkills}/>}
          {activePage === "questions" && <Questions questions={questions}/>}
          {activePage === "insights" && <Insights questions={questions}/>}
          {activePage === "notes" && <Notes questions={questions}/>}
          {activePage === "addQuestions" && <AddQuestions addQuestion={addQuestion}/>}
        </div>
      </div>
  )
}

export default App