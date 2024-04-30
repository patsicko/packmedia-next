import { Timestamp } from 'firebase/firestore';
import React from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import LikeSection from './LikeSection';
import CommentSection from './CommentSection';

export interface PostObject{
id:string,
image:string,
caption:string,
username:string,
timestamp:Timestamp,
profileImg:string,



}

function Post({post}:{post:PostObject}) {
  const isVideo = /\.mp4|\.webm|\.ogg/i.test(post.image);


  console.log("is video",isVideo,post.caption);
  console.log("post url",post.image,post.caption)
  return (
    <div className='bg-white my-7 border rounded-md'>
        <div className='flex items-center p-5 border-b border-gray-500'>
      <img  src={post.profileImg} alt={post.username} className='h-12 rounded-full object-cover border p-1 mr-3'/>
      <p className='flex-1 font-bold'>{post.username}</p>
      <HiOutlineDotsVertical className='cursor-pointer h-5'/>
        </div>
        {isVideo ? (
        <video controls className='object-cover w-full' style={{  maxWidth: '100%',height:'880px', maxHeight: '900px' }}>
          <source src={post.image} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={post.image} alt={post.caption} className='object-cover w-full' />
      )}
        <LikeSection id={post.id}/>
       
        <div className='p-5 overflow-scroll'>
            <span className='font-bold mr-2'>{post.username}</span>
            <div dangerouslySetInnerHTML={{ __html: post.caption }} />
        </div>
    
      <CommentSection post={post} id={post.id}/>
    </div>
  )
}

export default Post
