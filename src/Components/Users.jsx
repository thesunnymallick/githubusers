import React from 'react'
import{FaMapMarked} from "react-icons/fa"
function Users({img, name, location, bio, twitter_username,url}) {
  return (
    <>
       <div className='user-div'>
       <div>
       <div><img src={img} alt={name} /></div>
         <a href={url} target="_blank">{url}</a>
        </div>
       <div>
        <h4>{name}</h4>
         <p>{bio}</p>
         <p> <FaMapMarked/> {location}</p>
         <p>Twiter : <a href={`https://twitter.com/${twitter_username}`}target="_blank">
         https://twitter.com/{twitter_username}</a></p>

       </div>
       </div>
    </>
  )
}

export default Users