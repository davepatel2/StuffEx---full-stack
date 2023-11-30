import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Item from './Item'

function UserWishlist({ backendRoot }) {
  const [wishlistItems, setWishlistItems] = useState([])
  let { userId } = useParams()

  useEffect(() => {
    fetch(`${backendRoot}/users/${userId}/wishlist`)
      .then((res) => res.json())
      .then((data) => setWishlistItems(data))
      .catch((error) => console.error(error))
  }, [userId, backendRoot])

  return <Item itemData={wishlistItems} showSearchBar={false} title="Your Wishlist" />
}

export default UserWishlist
