import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import noImage from './images/no_image.png'
import { Link } from 'react-router-dom'
import Authentication from './authentication/Authentication.js'
import './ItemPage.css'
import './UserPage.js'
import AddToWishlistButton from './components/WishlistButton.js'

function ItemPage({ backendRoot }) {
  // Get the itemId from the URL parameters
  const { itemId } = useParams()

  // State variables
  const [item, setItem] = useState([]) // Store the item data
  const [user, setUser] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0) // Index of the currently displayed image
  const [isModalOpen, setIsModalOpen] = useState(false) // Boolean to control modal visibility

  // Fetch item data from the backend when the component mounts
  useEffect(() => {
    fetch(`${backendRoot}/items/${itemId}`)
      .then((res) => res.json())
      .then((json) => {
        setItem(json)
      })
      .catch((e) => console.log(e))
  }, [backendRoot, itemId])

  // Function to get the image source, falling back to a placeholder if no images exist
  const getImageSource = (item, index) =>
    item.images && item.images.length > 0 ? item.images[index] : noImage

  // Function to navigate to the previous or next image
  const navigateImage = (direction) => {
    const numImages = item.images.length
    if (numImages > 1) {
      let newImageIndex = (currentImageIndex + direction) % numImages
      if (newImageIndex < 0) {
        newImageIndex += numImages
      }
      setCurrentImageIndex(newImageIndex)
    }
  }

  // Function to toggle the modal's visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  // const userId = item.seller_id
  useEffect(() => {
    fetch(`${backendRoot}/users/${item.seller_id}`)
      .then((res) => res.json())
      .then((json) => {
        //console.log(item.seller_id)
        setUser(json)
      })
      .catch((e) => console.log(e))
  }, [backendRoot, item.seller_id])

  console.log(user)
  // JSX for the component     correct link
  return (
    <div>
      <h1>{item.title}</h1>
      <Link to={`/users/${user._id}`}>{user.username}</Link>
      {
        // if the user is logged in, show a button to add to their wishlist
        Authentication.isLoggedIn() ? (
          <AddToWishlistButton itemId={itemId} showWishlistLength={true} />
        ) : (
          <></>
        )
      }
      <div className="image-navigation center-content">
        {item.images && item.images.length > 0 ? (
          <>
            {item.images.length > 1 && (
              <button
                className="navigation-button"
                onClick={() => navigateImage(-1)}
              >
                Prev
              </button>
            )}
            <div className="image-container" onClick={toggleModal}>
              <img
                src={getImageSource(item, currentImageIndex)}
                className="image"
                alt={item.title}
              />
            </div>
            {item.images.length > 1 && (
              <button
                className="navigation-button"
                onClick={() => navigateImage(1)}
              >
                Next
              </button>
            )}
          </>
        ) : (
          <img src={noImage} className="image" alt="Nothing Uploaded" />
        )}
      </div>
      <p>{item.description}</p>
      <Link to={`/`}>Back to Item List</Link>
      {isModalOpen && (
        <div className="modal" onClick={toggleModal}>
          <div className="image-modal">
            <div className="modal-content">
              <span className="close" onClick={toggleModal}>
                &times;
              </span>
              <img
                src={getImageSource(item, currentImageIndex)}
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  backgroundColor: 'white',
                }}
                alt={item.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemPage
