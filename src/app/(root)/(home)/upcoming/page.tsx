import CallList from '@/components/CallList'
import React from 'react'

const upcoming = () => {
  return (
    <section className='flex size-full flex-col p-5 gap-y-10 text-white'>
      <h1 className='text-2xl font-bold'>Upcoming Calls</h1>
      <CallList type='upcoming'/>
    </section>
  )
}

export default upcoming