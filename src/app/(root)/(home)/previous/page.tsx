import CallList from '@/components/CallList'
import React from 'react'

const previous = () => {
  return (
    <section className='flex size-full p-5 flex-col gap-y-6 text-white'>
      <h1 className='font-bold text-2xl'>Previous Calls</h1>
      <CallList type='ended'/>
    </section>
  )
}

export default previous