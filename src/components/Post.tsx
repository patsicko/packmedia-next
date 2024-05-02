'use client'
import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { HiOutlineDotsVertical, HiOutlineShare } from 'react-icons/hi';
import LikeSection from './LikeSection';
import CommentSection from './CommentSection';
import dotenv from "dotenv"
import Link from 'next/link'
import {
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'next-share'

export interface PostObject{
id:string,
image:string,
caption:string,
username:string,
timestamp:Timestamp,
profileImg:string,



}

function Post({post}:{post:PostObject}) {
  let key=0
  const isVideo = /\.mp4|\.webm|\.ogg/i.test(post.image);
  dotenv.config()
const URL='https://packmedia-next.vercel.app/'

 

  return (
    <div className='bg-white my-7 border pb-4 rounded-md'>
    
        <div className='flex items-center p-5 border-b border-gray-500'>
      <img  src={post.profileImg} alt={post.username} className='h-12 rounded-full object-cover border p-1 mr-3'/>
      <p className='flex-1 font-bold'>{post.username}</p>
      <HiOutlineDotsVertical className='cursor-pointer h-5'/>
        </div>

        <Link href={`/pages/post/${post.id}`}  key={key++}>
        {isVideo ? (
        <video controls className='object-cover w-full' style={{  maxWidth: '100%',height:'880px', maxHeight: '900px' }}>
          <source src={post.image} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={post.image} alt={post.caption} className='object-cover w-full' />
      )}
        </Link>

      <div className='flex pt-4 px-4 border pb-4'>
      <LikeSection id={post.id}/>
        <div className='px-2 text-gray-500 text-md flex items-center justify-center'>Share to</div>
        
        <LinkedinShareButton url={'https://packmedia-next.vercel.app/'} >
      <LinkedinIcon size={32} round />
      </LinkedinShareButton>
       
      <WhatsappShareButton
      url={URL}
      title={'packmedia'}
      separator=":: "
      >
      <WhatsappIcon size={32} round />
    </WhatsappShareButton>

    <FacebookShareButton
      url={'https://packmedia-next.vercel.app/'}
      quote={''}
      hashtag={'#packmedia'}
    >
      <FacebookIcon size={32} round />
    </FacebookShareButton>
    <TwitterShareButton
      url={URL}
      title={'packmedia'}
    >
      <TwitterIcon size={32} round />
    </TwitterShareButton>
</div>


        <div className='p-5  w-[100%] p-x-4'>
            <span className='font-bold mr-2'>{post.username}</span>
            <Link href={`/pages/post/${post.id}`}  key={key++}>
            <div dangerouslySetInnerHTML={{ __html: post.caption }} />
            </Link>
            
        </div> 
        
        <CommentSection post={post} id={post.id}/>  
        
         
    </div>
  )
}

export default Post
