import React, { useEffect, useState } from 'react'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const HomePage = () => {

    let [posts, setPosts] = useState([])
  
    let addPost = async(e) => {
      e.preventDefault()

      let response = await fetch(REACT_APP_API_URL + '/add', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          },
        body:JSON.stringify({ 
          'text':e.target.text.value})
        })
  
        if (response.ok) {
          getPosts()
          e.target.reset();
          console.log('Added!')
        } else {
          console.log('Error adding new post!')
        }
      
    }

    let getPosts = async(e) => {

      let response = await fetch(REACT_APP_API_URL, {
        metchod: 'GET',
        headers: {
          'Content-Type':'application/json'
        }
      })
      let data = await response.json()

      if (response.status === 200) {
        setPosts(Object.values(data))
      }
    }
  
    useEffect(() => {
      getPosts()
      // eslint-disable-next-line
    }, [])  

    return (
      <div className='container'>
        <h1>wall-app</h1>

        <div className='container-flex'>
          <form onSubmit={(e) => addPost(e)}>
            <label>Add new entry: </label>
            <input id="text" type="text"/>
            <input type="submit"/>
          </form>          
        </div>

        <div className="container-flex m-2'">
          {posts.length !== 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">timestamp</th>
                <th scope="col">backend</th>
                <th scope="col">frontend</th>
                <th scope="col">text</th>
              </tr>
            </thead>
            <tbody>
            {[...posts].map(item => (
              <tr key={item.timestamp}>
                <td>{item.timestamp}</td>
                <td>{item.backend}</td>
                <td>{item.frontend}</td>
                <td>{item.message}</td>
              </tr>
            ))}
            </tbody>
          </table>
        ) 
        : 
        ( 
          <div className="container-flex m-5 text-center">
            <span className="h4">no urls found</span>
          </div>
        )
        }
        </div>

      </div>
      
    )
}

export default HomePage