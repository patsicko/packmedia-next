"use client"
import { app } from '@/firebase';
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

type PostType = {
    id: string;
}

type PropsType = {
    Id: string;
}

const Page: React.FC<PropsType> = ({ Id }) => {
   
const db = getFirestore(app);
const q = query(collection(db,'posts'),orderBy('timestamp','desc'));

const querySnapshoot =  await getDocs(q);

let data:any = [];

querySnapshoot.forEach((doc)=>{
    
    data.push({id:doc.id, ...doc.data()});
      
})

    return (
        <div>
          <h2>{Id}</h2>
       

            {data.map((post: PostType) => (
                <div key={post.id}>
                    {post.id}
                </div>
            ))}
        </div>
    )
}

export default Page;
