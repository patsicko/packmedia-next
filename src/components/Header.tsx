"use client"
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { signIn,useSession,signOut } from 'next-auth/react' 


function Header() {

  const {data:session} = useSession()
  console.log("session",session)
  return (
    <div className='shadow-sm border-b sticky top-0 bg-white z-30 p-3'>
     <div className='flex justify-between items-center max-w-6xl mx-auto'>
        <Link href='/'> 
        <Image
        src='/packlogo.png'
        width={40}
        height={40}
        alt='pack logo'
        priority
        />
         </Link>

         <input type="text" placeholder='search' className='bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]' />
     {session ? (
      session.user && session.user.image?(
        <img src={session?.user?.image} alt="profile image" width={40} height={40} className='rounded-full cursor-pointer' onClick={()=>signOut()}/>
      ):<Image src='/avatar.png' height={10} width={10} alt="avatar"/>
     
     ):<button onClick={()=>signIn()} className='text-sm font-semibold text-blue-500'>Log In</button>
     
     }


         
     </div>
    </div>
  )
}

export default Header
