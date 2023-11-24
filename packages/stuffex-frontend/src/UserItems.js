import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Item from './Item'

function UserItems({ backendRoot }) {
  const [userItems, setUserItems] = useState([])
  let { userId } = useParams()

  useEffect(() => {
    fetch(`${backendRoot}/users/${userId}/items`)
      .then((res) => res.json())
      .then((data) => setUserItems(data))
      .catch((error) => console.error(error))
  }, [userId, backendRoot]);

  return <Item itemData={userItems} showSearchBar={false} title="Your Items" />
}

export default UserItems
