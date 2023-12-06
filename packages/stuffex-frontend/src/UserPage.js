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
// <div>
//   <h1>{user.username}</h1>
//   {/* <Link to={`/users/${item.seller_id}`}>{user.username}</Link>
//       <div className="image-navigation center-content">
//         {item.images && item.images.length > 0 ? (
//           <>
//             {item.images.length > 1 && (
//               <button
//                 className="navigation-button"
//                 onClick={() => navigateImage(-1)}
//               >
//                 Prev
//               </button>
//             )}
//             <div className="image-container" onClick={toggleModal}>
//               <img
//                 src={getImageSource(item, currentImageIndex)}
//                 className="image"
//                 alt={item.title}
//               />
//             </div>
//             {item.images.length > 1 && (
//               <button
//                 className="navigation-button"
//                 onClick={() => navigateImage(1)}
//               >
//                 Next
//               </button>
//             )}
//           </>
//         ) : (
//           <img src={noImage} className="image" alt="Nothing Uploaded" />
//         )}
//       </div>
//       <p>{item.description}</p>
//       <Link to={`/`}>Back to Item List</Link>
//       {isModalOpen && (
//         <div className="modal" onClick={toggleModal}>
//           <div className="image-modal">
//             <div className="modal-content">
//               <span className="close" onClick={toggleModal}>
//                 &times;
//               </span>
//               <img
//                 src={getImageSource(item, currentImageIndex)}
//                 style={{
//                   maxWidth: '100%',
//                   maxHeight: '80vh',
//                   backgroundColor: 'white',
//                 }}
//                 alt={item.title}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// } */}
