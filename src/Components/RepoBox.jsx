import React from 'react'

function RepoBox({name,description, language}) {
  return (

    <div className="repoBox">
        <h4>{name}</h4>
         <p>{description}</p>
         <span>{language}</span>
    </div>
  )
}

export default RepoBox