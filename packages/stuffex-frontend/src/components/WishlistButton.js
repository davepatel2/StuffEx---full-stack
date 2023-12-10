import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { backendRoot } from '../AppConfig'
import Authentication from '../authentication/Authentication'
import './WishlistButton.css'

function WishlistButton({ itemId, showWishlistLength }) {
  // States to hold wishlist information
  const [userIsInterested, setUserIsInterested] = useState(false)
  const [userWishlist, setUserWishlist] = useState([])

  const { token, userId } = Authentication.getSessionCredentials() || {
    token: null,
    userId: null,
  }

  useEffect(() => {
    if (Authentication.isLoggedIn()) {
      Authentication.getCurrentUser().then(({ wishlist }) => {
        setUserWishlist(wishlist)
        setUserIsInterested(wishlist.includes(itemId))
      })
    }
  }, [itemId])

  function toggleWishlist() {
    const endpoint = `${backendRoot}/users/${userId}/wishlist/${itemId}`
    const requestMethod = userIsInterested ? 'DELETE' : 'PUT'

    fetch(endpoint, {
      method: requestMethod,
      headers: {
        authorization: `Token ${token}`,
      },
    })
      .then(async (res) => {
        if (requestMethod === 'DELETE') {
          setUserWishlist(
            userWishlist.filter((wishlistItemId) => wishlistItemId !== itemId)
          )

          setUserIsInterested(false)
        } else {
          setUserWishlist(await res.json())
          setUserIsInterested(true)
        }
      })
      .catch((e) => console.log(e))
  }

  // Return nothing if the user is not logged in
  if (!Authentication.isLoggedIn()) {
    return <></>
  }

  return (
    <div>
      <button onClick={toggleWishlist}>
        {userIsInterested ? 'Remove from Wishlist' : 'Add to Wishlist'}
        {showWishlistLength ? ` (${userWishlist.length} items)` : <></>}
      </button>
    </div>
  )
}

function SellItemButton({ interestedUsers, item }) {
  const userSelect = useRef(null)

  const { _id: itemId, seller_id: sellerId } = item

  function handleSell() {
    const buyerId = userSelect.current.value
    const { token } = Authentication.getSessionCredentials()

    fetch(`${backendRoot}/users/${sellerId}/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ buyerId: buyerId }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e))
  }

  const options = interestedUsers.map((user) => {
    return (
      <option key={user._id} value={user._id}>
        {user.username}
      </option>
    )
  })

  return (
    <div>
      <select ref={userSelect}>{options}</select>
      <button onClick={handleSell}>Mark as Sold</button>
    </div>
  )
}

function WishlistButtonWrapper({ item, showWishlistLength }) {
  const [interestedUsers, setInterestedUsers] = useState([])

  const { _id: itemId, seller_id: sellerId } = item

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${backendRoot}/items/${itemId}/interested`
        )

        if (!response.ok) {
          throw new Error(`HTTP Error Code ${response.status}`)
        }

        const data = await response.json()

        setInterestedUsers(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUsers()
  }, [itemId])

  // Determine if the itemId is owned by the signed-in user
  if (!Authentication.isLoggedIn()) {
    return <></>
  }

  const { userId } = Authentication.getSessionCredentials() || 'no-user-id'

  if (item.buyer_id) {
    const buyerLink = `/users/${item.buyer_id}`
    return (
      <Link to={buyerLink}>
        <div>Already Sold (see Buyer)</div>
      </Link>
    )
  }

  return userId === (sellerId || 'no-seller-id') ? (
    <SellItemButton interestedUsers={interestedUsers} item={item} />
  ) : (
    <WishlistButton itemId={itemId} showWishlistLength={showWishlistLength} />
  )
}

export default WishlistButtonWrapper
