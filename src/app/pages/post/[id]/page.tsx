import React from 'react'
import Posts from '@/components/singlepost/Posts'
import MiniProfile from '@/components/MiniProfile'

const page: React.FC<{ params: { id: string } }> = ({ params: { id } }) => {
  return (
    <main className='grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto '>
    <section className='md:col-span-2'>
   <Posts Id={id}/>
    </section>

    <section className='hidden md:inline-grid md:col-span-1'>
        <div className='fixed w-[380px]'>
        <MiniProfile/>
        </div>
  
    </section>
    </main>
  )
}

export default page
