"use client"
import React,{useEffect, useState} from 'react'
import { useSession } from 'next-auth/react';
import {HiOutlineHeart, HiHeart} from "react-icons/hi"
import { DocumentData, collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { app } from '@/firebase';
import { CustomUser } from '@/app/api/auth/[...nextauth]/route';

function LikeSection({id}) {
    const {data:session} = useSession();
    const [hasLiked,setHasLiked] = useState(false);
    const [likes, setLikes] = useState<DocumentData>([]);

    const db = getFirestore(app);

    useEffect(()=>{
      onSnapshot(collection(db,"posts",id,"likes"),(snapshot)=>{
        setLikes(snapshot.docs)
      })

    },[likes])

    useEffect(()=>{
      if(likes.findIndex((like: { id: any; })=>like.id ===(session?.user as CustomUser).uid) !== -1){
        setHasLiked(true)
      } else {
        setHasLiked(false)
      }
    })

    const likePost =()=>{

    }

  return (
    <div>
     {session && 
     <div className='flex border-t border-gray-100'>
        <div className=''>
      {

        hasLiked ? (<HiHeart onClick={likePost} className='text-red-500 cursor-pointer text-3xl hover:scale-125 transition-transform duration-200 ease-out'/>):(
        <HiOutlineHeart className='cursor-pointer text-3xl hover:scale-125 transition-transform duration-200 ease-out'/>

        )
      }


        </div>
    </div>}
    </div>
  )
}

export default LikeSection
