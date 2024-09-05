import CallList from '@/components/CallList'
import React from 'react'

const recordings = () => {
  return (
    <section className='flex size-full flex-col p-5 gap-y-10 text-white'>
      <h1 className='text-2xl font-bold'>Recordings</h1>
      <CallList type='recordings'/>
    </section>
  )
}

export default recordings