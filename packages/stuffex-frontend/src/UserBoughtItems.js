import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Item from './Item'

function UserBoughtItems({ backendRoot }) {
  const [boughtItems, setBoughtItems] = useState([])
  let { userId } = useParams()

  useEffect(() => {
    fetch(`${backendRoot}/users/${userId}/items-bought`)
      .then((res) => res.json())
      .then((data) => setBoughtItems(data))
      .catch((error) => console.error(error))
  }, [userId, backendRoot])

  return <Item itemData={boughtItems} showSearchBar={false} title="Items You Have Received" />
}

export default UserBoughtItems
