import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Item from './Item'

function UserItems({ backendRoot }) {
  const [userItems, setUserItems] = useState([])
  const [user, setUser] = useState({username: ''})
  
  let { userId } = useParams()

  useEffect(() => {
    fetch(`${backendRoot}/users/${userId}/items`)
      .then((res) => res.json())
      .then((data) => setUserItems(data))
      .catch((error) => console.error(error))
      fetch(`${backendRoot}/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error))
  }, [userId, backendRoot])


  return <Item itemData={userItems} showSearchBar={false} title= {`items by ${user.username}`}/>
}

export default UserItems
