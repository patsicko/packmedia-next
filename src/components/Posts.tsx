import Link from 'next/link'
import { app } from '@/firebase';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import React from 'react'
import Post, { PostObject } from '@/components/Post';

async function Posts() {

const db = getFirestore(app);
const q = query(collection(db,'posts'),orderBy('timestamp','desc'));

const querySnapshoot =  await getDocs(q);

let data:any = [];

querySnapshoot.forEach((doc)=>{
    
    data.push({id:doc.id, ...doc.data()});
      
})

  return (
    <div>
      {data.map((post:PostObject)=>(
<Link href={`/pages/post/${post.id}`}  key={post.id}>
        <Post key={post.id} post = {post}/>
</Link>
      ))}

   
    </div>
  )
}

export default Posts

