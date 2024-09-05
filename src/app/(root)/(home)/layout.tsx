import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'YOOM',
  description: 'A workspace for your team, powered by Stream Chat and Clerk.',
};

const HomeLayout = ({children}: {children: React.ReactNode}) => {
  return (
   <main id='home' className=''>
    <Navbar/>
    <Sidebar/>
    <section className='bg-dark-1 row-end-3 sm:col-start-2 col-end-3 col-start-1 p-7'>
      {children}
    </section>
    
   </main>
  )
}

export default HomeLayout