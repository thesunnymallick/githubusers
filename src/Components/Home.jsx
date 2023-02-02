
import React from 'react'
import { useState } from 'react'
import UserDetails from './UserDetails';

function Home() {

  const[userName, setUserName]=useState();
  return (
    <>
     <div className='Search-bar'>

     <input type="text" placeholder='Enter Your User Name' value={userName} onChange={(e)=>setUserName(e.target.value)}/>

     </div>

     <UserDetails username={userName}/>
    </>

  )
}

export default Home