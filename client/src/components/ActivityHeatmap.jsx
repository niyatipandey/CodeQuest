import React from 'react'

const ActivityHeatmap = ({activity}) => {

    function getColor(count){
        if(count == 0){
            return "bg-gray-300"
        }
        if(count == 1){
            return "bg-teal-200"
        }
        if(count == 2){
            return "bg-teal-300"
        }
        if(count == 3){
            return "bg-teal-600"
        }
        return "bg-teal-800"
    }
  return (
    <div className='mt-4'>
        <div className="grid grid-cols-10 gap-1 mt-4 justify-center">
            {activity.map((act,index)=> (
                <div key={index} className={`h-3 w-3 sm:h-4 sm:w-4 ${getColor(act.count)} rounded-sm hover:scale-125 transition-transform duration-150`}
                title={`${act.date} • ${act.count} solved`}>
                </div>
            ))}
        </div>
        <div className="flex justify-center mt-6">
                <div className='flex items-center gap-1 sm:gap-2'>
                    <p className='text-sm text-[#1D5B4F]'>Less</p>
                    <div className='h-4 w-4 bg-gray-300 rounded-sm'></div>
                    <div className='h-4 w-4 bg-teal-200 rounded-sm'></div>
                    <div className='h-4 w-4 bg-teal-400 rounded-sm'></div>
                    <div className='h-4 w-4 bg-teal-600 rounded-sm'></div>
                    <div className='h-4 w-4 bg-teal-800 rounded-sm'></div>
                    <p className='text-sm text-[#1D5B4F]'>More</p>
            </div>
        </div>
    </div>
  )
}

export default ActivityHeatmap