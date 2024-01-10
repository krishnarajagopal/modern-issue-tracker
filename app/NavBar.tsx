'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import { GiBugNet } from 'react-icons/gi'
import classNames from 'classnames'

const NavBar = () => {
       const currentPath = usePathname()
       console.log(currentPath);
       
        const links = [
            {label: 'Dashboard',href:"/"},
            {label: 'Issues',href:"/issues"},
        ]
  return (
    <nav  className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><GiBugNet /></Link>
        <ul className='flex space-x-6'>
                {links.map((link) => (
                    <li key={link.href}><Link className={classNames({
                        'text-zinc-900':link.href === currentPath, 
                        'underline':link.href === currentPath,
                        'text-zinc-500':link.href !== currentPath,
                        'hover:text-zinc-900':true,})} href={link.href}>{link.label}</Link></li>
                ))}
        </ul>
    </nav>
  )
}

export default NavBar