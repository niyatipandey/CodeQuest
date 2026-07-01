import React from 'react'
import { PieChart , Pie , Cell , Tooltip , Legend } from 'recharts'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer ,CartesianGrid } from 'recharts'
import ActivityHeatmap from '../components/ActivityHeatmap'

const Analytics = ({analytics}) => {
  if (!analytics) {
    return (
      <p className="text-center text-gray-500 mt-20">
        Loading analytics...
      </p>
    );
  }

  const COLORS = ['#22c55e' , '#eab308' , '#ef4444']

  const DIFFICULTY_COLORS = [
    '#22c55e', 
    '#eab308', 
    '#ef4444' 
  ];

  const solveData = [
    { name: "Easy", value: analytics?.easy || 0 },
    { name: "Medium", value: analytics?.medium || 0 },
    { name: "Hard", value: analytics?.hard || 0 }
  ];

  const avgTime = analytics?.avgTime || 0;

  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='row-span-2 bg-[#EAF5F0] border border-[#C8D6D0] rounded-lg p-4'>
        <p className='text-[#1D5B4F] text-lg mb-1 font-bold'>Problem Solving Activity</p>
        <p className='text-gray-600 text-sm'>Last 90 Days</p>
        <div className='rounded-lg'>
          <ActivityHeatmap activity ={analytics?.activityHeatmap || []} />
        </div>
      </div>

      <div className='bg-[#EAF5F0] border border-[#C8D6D0] rounded-lg p-4 h-full'>
        <p className='text-[#1D5B4F] text-m mb-2 font-semibold'>Help Breakdown</p>
        <div className='flex items-center h-full'>
          <PieChart width={200} height={200}>
            <Pie data={(analytics?.helpBreakdown || [])} cx={100} cy={100} innerRadius={55} outerRadius={80} dataKey="value">
              {(analytics?.helpBreakdown || []).map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className='flex flex-col gap-2'>
            {(analytics?.helpBreakdown || []).map((entry, index) => (
              <div key={index} className='flex items-center gap-2'>
                <div className='w-3 h-3 rounded-full' style={{backgroundColor: COLORS[index]}}/>
                <span className='text-gray-700 text-sm'>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
    </div>

      <div className='bg-[#EAF5F0] border border-[#C8D6D0] rounded-lg p-4'>
        <p className='text-[#1D5B4F] text-m font-semibold'>Average Time</p>
        <p className=' text-[#184C40] text-2xl font-bold mt-2'>{avgTime} <span className='text-gray-600 text-m font-semibold'>mins</span></p>
        <p className='text-gray-600 text-sm mt-2'>per question</p>
        {avgTime > 0 && <p className=' text-gray-600 font-bold text-sm mt-4'>{avgTime < 15 ? "⚡ Solving fast" : avgTime < 30 ? "👍 Good pace" : "🐢 Taking your time"}</p>}
      </div>

      <div className='col-span-2 bg-[#EAF5F0] border border-[#C8D6D0] rounded-lg p-4'>
        <p className='text-[#1D5B4F] text-m mb-4'>Topic Distribution</p>

        {Object.entries(analytics?.topicDistribution || {}).length === 0 ? (<p className='text-gray-600'>
          No data yet
        </p>) : (
          Object.entries(analytics?.topicDistribution || {}).map(([topic,count]) => {
            const maxCount = Math.max(...Object.values(analytics?.topicDistribution || {}))
            const percentage = Math.round((count/maxCount)*100)

            return (
              <div key={topic} className='mb-3'>
                <div className='flex justify-between mb-1'>
                  <span className='text-[#023c2e] text-sm font-semibold'>{topic}</span>
                  <span className='text-gray-700 text-sm'>{count} questions</span>
                  </div>
                  <div className='bg-[#0F5B48] h-1.5 rounded-full w-full'>
                    <div 
                    className='bg-[#074334] h-2 rounded-full transition-all'
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