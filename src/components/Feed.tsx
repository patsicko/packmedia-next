import React from 'react'
import Post from './Post'
import MiniProfile from './MiniProfile'

function Feed() {
  return (
    <main className='grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto '>
    <section className='md:col-span-2'>
   <Post/>
    </section>

    <section className='hidden md:inline-grid md:col-span-1'>
  <MiniProfile/>
    </section>
    </main>
  )
}

export default Feed
 