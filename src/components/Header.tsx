"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { signIn,useSession,signOut } from 'next-auth/react' 
import Modal from "react-modal"
import { IoAddCircleOutline } from "react-icons/io5";
import { HiCamera } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'


function Header() {

  const {data:session} = useSession()
  const [isOpen, setIsOpen]=useState(false)
  return (
    <div className='shadow-sm border-b sticky top-0 bg-white z-30 p-3'>
     <div className='flex justify-between items-center max-w-6xl mx-auto'>
        <Link href='/'> 
        <Image
        src='/packmedia.png'
        width={98}
        height={98}
        alt='pack logo'
        priority
        className='rounded-md '
        />
         </Link>

         <input type="text" placeholder='search' className='bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]' />
     {session ? (
      <div className='flex gap-2 items-center'>
      <IoAddCircleOutline onClick={()=>setIsOpen(true)} className='text-2xl cursor-pointer transform hover:scale-125 transition duration-300 hover:text-red-600' />
      {
      session.user && session.user.image?(
        <img src={session?.user?.image} alt="profile image" width={40} height={40} className='rounded-full cursor-pointer' onClick={()=>signOut()}/>
      ):<Image src='/avatar.png' height={10} width={10} alt="avatar"/>
     }</div>
     ):
     <button onClick={()=>signIn()} className='text-sm font-semibold text-blue-500'>Log In</button>
     
     }


         
     </div>
     {
      isOpen && (
        <Modal isOpen={isOpen} onRequestClose={()=>setIsOpen(false)} ariaHideApp={false} className='max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md  '
        >
          <div className='flex flex-col justify-center items-center h-[100%'>
           <HiCamera className='text-5xl text-gray-400 cursor-pointer'/>
          </div>
          <input type="text" maxLength={150} placeholder='please enter your caption ' className='m-4 border-none text-center w-full focus:ring-0 outline-none' />
         <button disabled className='w-full bg-red-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100'>Upload post</button>
         <AiOutlineClose className='cursor-pointer absolute top-2 right-2 hover:text-red-600 transition duration-300' onClick={()=>setIsOpen(false)}/>
        </Modal>
      )
     }
    </div>
  )
}

export default Header
