import React from 'react'
import { PieChart , Pie , Cell , Tooltip , Legend } from 'recharts'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer ,CartesianGrid } from 'recharts'

const Analytics = ({questions}) => {

  const solveCount = questions.filter(q=> q.solved === 'Yes').length
  const total = questions.length
  const solveRate = total > 0 ? Math.round((solveCount/total)*100) : 0

  const helpCount = questions.filter(q => q.helpTaken === 'Help Taken').length
  const helpRate = total >0 ? Math.round((helpCount/total)*100) : 0

  const topicCount = {}
  {questions.forEach((q)=>{
    topicCount[q.topic] = (topicCount[q.topic] || 0 ) +1
  })}

  const avgTime = total > 0 ? Math.round(
    questions.reduce((sum,q) => sum + Number(q.timeTaken),0)/total) : 0

  const helpData = [
    { name:'No Help' , value: questions.filter((q) => q.helpTaken === 'No Help').length},
    { name:'Help Taken' , value: questions.filter((q) => q.helpTaken === 'Help Taken').length},
    { name:'Watched Solution' , value: questions.filter((q) => q.helpTaken === 'Watched Solution').length}
  ]

  const COLORS = ['#22c55e' , '#eab308' , '#ef4444']

  const solveData = [
    {name:'Solved' , value:solveCount},
    {name:'Unsolved', value: total-solveCount}
  ]

  const SOLVE_COLORS = ['#22c55e', '#ef4444']


  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='row-span-2 bg-gray-800 rounded-lg p-4'>
        <p className='text-gray-400 text-sm mb-1'>Solved Rate</p>
        <p className='text-white text-3xl font-bold mb-4'>{solveRate}%</p>
        <div className='bg-gray-800 rounded-lg'>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={solveData} barSize={90} margin={{top: 5, right: 10, left: -20, bottom: 5}}>
              <XAxis dataKey="name" stroke='#9ca3af'/>
              <YAxis stroke='#9ca3af' stroke='transparent' tick={{fill: '#9ca3af'}}/>
              <Tooltip
                contentStyle={{backgroundColor: '#1e293b', border: '1px solid #374151', borderRadius: '8px'}}
                labelStyle={{color: 'white'}}
                itemStyle={{color: 'white'}}
                formatter={(value) => [value, 'Count']}
              />
              <Bar dataKey="value" radius={[6,6,0,0]}>
                {solveData.map((entry, index) => (
                  <Cell key={index} fill={SOLVE_COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className='bg-gray-800 rounded-lg p-4 h-full'>
        <p className='text-gray-400 text-sm mb-2'>Help Breakdown</p>
        <div className='flex items-center'>
          <PieChart width={200} height={200}>
            <Pie data={helpData} cx={100} cy={100} innerRadius={55} outerRadius={80} dataKey="value">
              {helpData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className='flex flex-col gap-2'>
            {helpData.map((entry, index) => (
              <div key={index} className='flex items-center gap-2'>
                <div className='w-3 h-3 rounded-full' style={{backgroundColor: COLORS[index]}}/>
                <span className='text-gray-400 text-sm'>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
    </div>

      <div className='bg-gray-800 rounded-lg p-4'>
        <p className='text-gray-400 text-sm'>Average Time</p>
        <p text-white text-3xl font-bold mt-2>{avgTime} <span className='text-gray-400 text-lg'>mins</span></p>
        <p className='text-gray-500 text-sm mt-2'>per question</p>
        {avgTime > 0 && <p text-gray-600 text-xs mt-4>{avgTime < 15 ? "⚡ Solving fast" : avgTime < 30 ? "👍 Good pace" : "🐢 Taking your time"}</p>}
      </div>

      <div className='col-span-2 bg-gray-800 rounded-lg p-4'>
        <p className='text-gray-400 text-sm mb-4'>Topic Distribution</p>

        {Object.entries(topicCount).length === 0 ? (<p className='text-gray-500'>
          No data yet
        </p>) : (
          Object.entries(topicCount).map(([topic,count]) => {
            const maxCount = Math.max(...Object.values(topicCount))
            const percentage = Math.round((count/maxCount)*100)

            return (
              <div key={topic} className='mb-3'>
                <div className='flex justify-between mb-1'>
                  <span className='text-white text-sm'>{topic}</span>
                  <span className='text-gray-400 text-sm'>{count} questions</span>
                  </div>
                  <div className='w-full bg-gray-700 rounded-full h-2'>
                    <div 
                    className='bg-blue-500 h-2 rounded-full transition-all'
                    style={{width: `${percentage}%`}}/>
                  </div>
                </div>
            )
          })
        )
        }
      </div>
    </div>
  )
}

export default Analytics