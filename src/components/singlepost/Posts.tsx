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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const db = getFirestore(app);
                const q = query(collection(db,'posts',id), orderBy('timestamp', 'desc'));
                const querySnapshot = await getDocs(q);

                let postData: PostType[] = [];

                querySnapshot.forEach((doc) => {
                    postData.push({id: doc.id, ...doc.data()});
                });

                setData(postData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
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
