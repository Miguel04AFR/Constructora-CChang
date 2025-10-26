import React from 'react'
import { roboto } from '@/src/config/font';
import Link from 'next/link';

export const MenuBar = () => {
  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      <div>
        <Link href="/">
        <span className={' ${robot.className} antialiased font-bold'}>CChang</span>
        <span> | CChang</span>
        </Link>
      </div>

      <div className='flex gap-5'>

        <Link href="/"></Link>

      </div>


     
    </nav>
  )
}
