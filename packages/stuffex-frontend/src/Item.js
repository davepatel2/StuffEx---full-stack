import React, { useState } from 'react'
import noImage from './images/no_image.png'

function ItemHeader() {
  return (
    <div style={{ textAlign: 'center', fontSize: '24px', padding: '20px 0' }}>
      Recently Posted
    </div>
  )
}

function ItemBody(props) {
  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    padding: '10px',
  }

  const itemStyle = {
    border: '1px solid green',
    borderRadius: '10px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0px 2px 4px rgba(0, 128, 0, 0.2)',
    minHeight: '300px',
  }

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'contain',
    border: '1px solid green',
    borderRadius: '5px',
  }

  const textStyle = {
    maxHeight: '100px', // Fixed maximum height
    overflowY: 'auto', // Enable vertical scrolling
    padding: '5px',
    textAlign: 'justify',
    height: '100px', // Fixed height for consistency
  }

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    height: '30px', // Fixed height for navigation buttons
  }

  const buttonStyle = {
    padding: '3px 6px', // Reduced padding
    margin: '5px',
    border: '1px solid green',
    borderRadius: '5px',
    backgroundColor: 'white',
    color: 'black',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '12px', // Smaller font size
    transition: 'background-color 0.3s',
  }

  const lineStyle = {
    borderTop: '1px solid green',
    margin: '10px 0',
  }

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

    return (
      <div style={itemStyle} key={itemIndex}>
        <div style={{ ...textStyle, maxHeight: '30px' }}>{item.title}</div>
        <div style={lineStyle} /> {/* Always show the top line */}
        <div style={{ textAlign: 'center' }}>
          <div style={buttonContainerStyle}>
            {showNavigationButtons && (
              <button
                style={buttonStyle}
                onClick={() => navigateImage(imageIndex, itemIndex, -1)}
              >
                Prev
              </button>
            )}
          </div>
          <img src={imageSrc} alt={item.title} style={imageStyle} />
          <div style={buttonContainerStyle}>
            {showNavigationButtons && (
              <button
                style={buttonStyle}
                onClick={() => navigateImage(imageIndex, itemIndex, 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div style={lineStyle} /> {/* Always show the bottom line */}
        <div style={textStyle}>{item.description}</div>
      </div>
    )
  })

  return <div style={gridContainerStyle}>{rows}</div>
}

function SearchBar(props) {
  const divStyle = {
    textAlign: 'center',
  }

  const inputStyle = {
    borderRadius: '10px',
    fontSize: '3em',
    padding: '0.25em 1em',
  }

  return (
    <div style={divStyle}>
      <input
        style={inputStyle}
        placeholder="Search for anything..."
        type="text"
        onChange={(e) => props.updateItems(e.currentTarget.value)}
      />
    </div>
  )
}

function Item(props) {
  return (
    <div>
      <SearchBar updateItems={props.updateItems} />
      <ItemHeader />
      <ItemBody itemData={props.itemData} />
    </div>
  )
}

export default Item
