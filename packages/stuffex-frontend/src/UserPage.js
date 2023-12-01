import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


import './ItemPage.css'

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
    <div>
      <h2>About StuffEx</h2>
      <p>
        StuffEX is a website for individuals who want to find and get rid any
        item. It allows people to post items they don't want anymore so others
        can give them a new home. Unlike Craigslist, our product is strictly for
        free items. We aren't connecting sellers to buyers but people to people.
      </p>
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


