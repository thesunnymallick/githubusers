import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { FaMapMarked } from "react-icons/fa"
import Users from "./Users"
import RepoBox from './RepoBox'
import Loader from './Loader'
import Error from './Error'

function UserDetails({username}) {

  const [user, setUser] = useState([]);
  const [repo, setRepo] = useState([]);
  const [loading, setLoading] = useState(true)
  const [perPageShow, setPerPageShow] = useState(10);
  const [currentpage, SetCurrentpage] = useState(1);
  const [usererror,   setUserError] = useState(false);
  const [repoError , setrepoError]=useState(false);

  const pages = [];
  for (let i = 1; i <= Math.ceil(repo.length / perPageShow); i++) {
    pages.push(i)
  }
  console.log("page", pages.length)

  const LastindexOfItems = currentpage * perPageShow;
  const FirstindexOfItems = LastindexOfItems - perPageShow;
  const CurrentRepo = repo.slice(FirstindexOfItems, LastindexOfItems);

  useEffect(() => {

    const fetchGithubUser = async () => {
      try {
     
        const { data } = await axios.get(`https://api.github.com/users/${username}`,{
        method :"GET",
        headers: {
            'Authorization': 'token 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',
        }
        })
        setUser([data]);


      } catch (error) {
        setLoading(false);
      

      }

    }


    const fetchRepo = async () => {
      try {
        const { data } = await axios.get(`https://api.github.com/users/${username}/repos?`,{
          method :"GET",
          headers: {
              'Authorization': 'token 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',
          }
        })
        // console.log(data[0].name)
        setRepo(data)
      } catch (error) {
        setLoading(false);
    

      }

    }
    fetchGithubUser();
    fetchRepo();




  }, [username])




  const HandelClick = (pageNo) => {
    SetCurrentpage(pageNo);
  }
  const HandelPrev = () => {
    if (currentpage > 1) {
      SetCurrentpage(currentpage - 1)
    }

  }
  const HandelNext = () => {
    if (currentpage <repo.length / perPageShow) {
      SetCurrentpage(currentpage + 1)
    }
  }

  if (usererror) {
    return <Error message={"User Not Found"} />
  }

  if(repoError)
  {
    return <Error message={"NO Repo Found"} />

  }

  return (

    <>
      {
        loading ? <Loader /> : (<div className="user">

          {Array.from(user).map((i, index) =>

            <Users key={i.id}
              name={i.name}
              img={i.avatar_url}
              location={i.location}
              bio={i.bio}
              twitter_username={i.twitter_username}
              url={i.url}
            />

          )}
        </div>)
      }

      {
        loading ? <Loader /> : (
          <div className="repo">
            {
              CurrentRepo.map((i) =>
                <RepoBox
                  key={i.id}
                  name={i.name}
                  description={i.description}
                  language={i.language}

                />
              )
            }
          </div>
        )
      }
      <div className='pagination'>
        <span onClick={HandelPrev}>Prev</span>
        {
          pages.map((i) => (
            <span className={currentpage == i ? "active" : ""} key={i} onClick={() => HandelClick(i)}>{i}</span>
          )
          )
        }
        <span onClick={HandelNext}>Next</span>
      </div>
    </>



  )
}

export default UserDetails