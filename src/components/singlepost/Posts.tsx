"use client"

import { app } from '@/firebase';
import { collection, doc, getDoc, getFirestore, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

type PostType = {
  id: string;
};

type PropsType = {
  id: string;
};

const Page: React.FC<PropsType> = ({ id }) => {
  const [data, setData] = useState<PostType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const postRef = doc(collection(db, 'posts'), id); // Create a reference to the specific post

        const querySnapshot = await getDoc(postRef);

        if (querySnapshot.exists) {
          const postData = { id: querySnapshot.id, ...querySnapshot.data() } as PostType; // Ensure type safety
          setData(postData);
        } else {
          console.warn(`Post with ID "${id}" not found.`); // Informative message
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {id} {/* Display the ID for reference */}
      {data ? (
        <div key={data.id}>
          {/* Access and display post properties here (e.g., title, content) */}
        </div>
      ) : (
        <div>Post not found.</div>
      )}
    </div>
  );
};

export default Page;