"use client"
import { app } from '@/firebase';
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

type PostType = {
    id: string;
}

type PropsType = {
    id: string;
}

const Page: React.FC<PropsType> = ({ id }) => {
  const [data, setData] = useState<PostType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const db = getFirestore(app);
              const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), where('id', '==', id)); // changed 'Id' to 'id'
              const querySnapshot = await getDocs(q);

              let postData: PostType[] = [];

              querySnapshot.forEach((doc) => {
                  postData.push({ id: doc.id, ...doc.data() });
              });

              setData(postData);
              setError(null); // Reset error if successful
          } catch (error) {
              console.error("Error fetching data:", error);
              setError("Error fetching data: " + error.message);
          }
      };

      fetchData();
  }, [id]); // changed 'Id' to 'id'

    return (
        <div>
            {error && <div>Error: {error}</div>}
          {id}
          {data.length === 0 ?(
<div>{data.length}</div>
          ):(
            data.map((post: PostType) => (
              <div key={post.id}>
                  {post.id}
              </div>
          ))
          )}
          
        </div>
    )
}

export default Page;
