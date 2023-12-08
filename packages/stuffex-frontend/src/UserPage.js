import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userImage from './images/profile.png'
import './UserPage.css'
import { Link } from 'react-router-dom'

function UserPage(props) {
  // Get the userID from the URL parameters
  const { userId } = useParams()

  // // State variables
  // // const [item, setItem] = useState([]) // Store the item data
  const [user, setUser] = useState([])

  // // Backend root URL
  const backendRoot = props.backendRoot

  // Fetch item data from the backend when the component mounts

  useEffect(() => {
    fetch(`${backendRoot}/users/${userId}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setUser(json)
      })
      .catch((e) => console.log(e))
  }, [backendRoot, user, userId])

  // console.log(userId)
  // JSX for the component
  return (
    <div className="user-page">
      <h2>
        <img src={userImage} className="profile-image" alt="Profile" />
      </h2>
      <h2>{user.username}</h2>
      <p>{}</p>
      <div className="box-with-link">
        <Link to={`/users/${userId}/items`}>Previous Listings</Link>
      </div>
      <div className="box-with-link">
        <Link to={`/users/${userId}/wishlist`}>Wishlist</Link>
      </div>
      <div className="box-with-link">
        <Link to={`/users/${userId}/items_bought`}>Received Items</Link>
      </div>
    </div>
  )
}
export default UserPage
