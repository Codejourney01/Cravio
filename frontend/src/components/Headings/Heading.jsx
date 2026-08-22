import React from 'react'

export default function Heading({headingname,subheading}) {
  return (
    <div className='w-full'>
        <div className='flex items-center justify-between w-full'>
            <h1 className=' text-heading font-semibold text-[14px] md:text-lg'>{headingname}</h1>
            <span className='mr-4 text-[10px] md:text-sm font-semibold  text-subheading'>View All </span>
        </div>
        <h4 className='text-heading md:text-sm mt-[5px] md:mt-[2px]  text-[8px] font-light '>{subheading}</h4>
    </div>
  )
}
