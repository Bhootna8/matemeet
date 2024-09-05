import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <aside className='flex-col hidden sm:flex gap-y-5 px-3 py-9  row-start-2 col-start-1 col-end-2'>
      {sidebarLinks.map((item, i)=> (
        <Link  href={item.route} key={i} className=' flex cursor-pointer hover:bg-blue-1 p-3 rounded-md'>
          <Image alt='' src={item.imgURL} width={22} height={22}/>
          <h1 className='ml-4 text-white'>{item.label}</h1>
        </Link>
      ))}
    </aside>
  )
}

export default Sidebar