//Item.js
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import noImage from './images/no_image.png'
import './Item.css'

function ItemHeader({ title }) {
  return <div className="item-header">{title}</div>
}

function ItemBody(props) {
  const getImageSource = (item, index) => {
    return item.images.length > 0 ? item.images[index] : noImage
  }

  const navigateImage = (index, itemIndex, direction) => {
    let newImageIndex = index + direction
    if (newImageIndex >= props.itemData[itemIndex].images.length) {
      newImageIndex = 0
    } else if (newImageIndex < 0) {
      newImageIndex = props.itemData[itemIndex].images.length - 1
    }

    setCurrentImageIndexes((prev) => ({
      ...prev,
      [itemIndex]: newImageIndex,
    }))
  }

  const [currentImageIndexes, setCurrentImageIndexes] = useState(
    props.itemData.reduce((acc, _, idx) => ({ ...acc, [idx]: 0 }), {})
  )

  const rows = props.itemData.map((item, itemIndex) => {
    const imageIndex = currentImageIndexes[itemIndex] || 0
    const imageSrc = getImageSource(item, imageIndex)

    const showNavigationButtons = item.images.length > 1
    const itemUrl = `/item/${item._id}`

    return (
      <div className="item-style" key={itemIndex}>
        <Link to={itemUrl}>
          <div className="item-title">{item.title}</div>
        </Link>
        <div className="line-style" />
        <div className="image-navigation">
          <div className="button-container">
            {showNavigationButtons && (
              <button
                className="navigation-button"
                onClick={() => navigateImage(imageIndex, itemIndex, -1)}
              >
                Prev
              </button>
            )}
          </div>
          <img src={imageSrc} alt={item.title} className="image-style" />
          <div className="button-container">
            {showNavigationButtons && (
              <button
                className="navigation-button"
                onClick={() => navigateImage(imageIndex, itemIndex, 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="line-style" />
        <div className="item-description">{item.description}</div>
      </div>
    )
  })

  return <div className="grid-container-style">{rows}</div>
}

function SearchBar(props) {
  const searchBarInput = useRef(null)

  const handleSearch = () => props.updateItems(searchBarInput.current.value)
  const restoreItems = () => {
    searchBarInput.current.value = '' // Clear the input value
    props.updateItems()
  }
  return (
    <div
      className="search-bar"
      style={{
        width: 800,
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <input
        className="search-input"
        type="text"
        ref={searchBarInput}
        style={{ flex: 1, margin: '30 px', fontSize: '18px', height: '40px' }} // Adjust styles as needed
        placeholder="Search for anything..."
      />
      <button
        onClick={restoreItems}
        style={{ width: '40px', height: '46px', borderLeft: 'none' }}
        className="search-button"
      >
        X
      </button>
      <button
        onClick={handleSearch}
        className="search-button"
        style={{ marginLeft: '40px', height: '46px', fontSize: '18px' }}
      >
        Search
      </button>
    </div>
  )
}

function Item(props) {
  const { showSearchBar = true, title = 'Recently Posted' } = props
  return (
    <div>
      {showSearchBar && <SearchBar updateItems={props.updateItems} />}
      <ItemHeader title={title} />
      <ItemBody itemData={props.itemData} />
    </div>
  )
}

export default Item
