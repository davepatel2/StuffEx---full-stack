import { useState, useEffect } from 'react'
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

function SellItemButton() {
  function handleSell() {
    alert('unimplemented')
  }

  return (
    <div>
      <button onClick={handleSell}>Mark as Sold</button>
    </div>
  )
}

function WishlistButtonWrapper({ item, showWishlistLength }) {
  // Determine if the itemId is owned by the signed-in user
  if (!Authentication.isLoggedIn()) {
    return <></>
  }

  const { _id: itemId, seller_id: sellerId } = item
  const { userId } = Authentication.getSessionCredentials() || 'no-user-id'

  return userId === (sellerId || 'no-seller-id') ? (
    <SellItemButton />
  ) : (
    <WishlistButton itemId={itemId} showWishlistLength={showWishlistLength} />
  )
}

export default WishlistButtonWrapper
