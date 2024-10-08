import Image from 'next/image'
import React from 'react'
import logo from '../../public/icons/yoom-logo.svg'

const Navbar = () => {
  return (
    <nav className='flex items-center px-5 w-full'>
      <Image src={logo} alt='' width={90} height={60}/>
      <Image src={'/images/avatar-5.png'} width={40} className='rounded-full ml-auto' height={40} alt='' />
    </nav>
  ) 
}

export default Navbar