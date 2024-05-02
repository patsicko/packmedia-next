"use client"
import { app } from '@/firebase';
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

type Post = {
  id:string;
  image:string;
  caption:string;
  username:string;
  timestamp:Timestamp;
  profileImg:string;
}

type Props = {
  Id: string;
}

const Page: React.FC<Props> = ({ Id }) => {
  const [data, setData] = useState<Post[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), where('id', '==', Id));
        const querySnapshot = await getDocs(q);
  
        const postData: Post[] = [];
  
        querySnapshot.forEach((doc) => {
          postData.push({ id: doc.id, ...doc.data() } as Post);
        });
  
        setData(postData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [Id]); // Add id as a dependency to useEffect
  
  return (
    <div>
      {data.map((post) => (
        <div  key={post.id}>
        <div>{post.id}</div>
        <span className='font-bold mr-2'>{post.username}</span>
        </div>
      ))}
    </div>
  );
}

export default Page;
