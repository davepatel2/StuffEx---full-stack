import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import noImage from './images/no_image.png'

function ItemPage(props) {
  const { itemId } = useParams()
  const [item, setItem] = useState([])

  const backendRoot = props.backendRoot

  useEffect(() => {
    fetch(`${backendRoot}/items/${itemId}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setItem(json)
      })
      .catch((e) => console.log(e))
  }, [backendRoot, itemId])

  const imageStyle = {
    maxWidth: '200px',
  }

  const getImageSource = (item, index) =>
    item.images && item.images.length > 0 ? item.images[index] : noImage

  return (
    <div>
      <h1>{item.title}</h1>
      <img src={getImageSource(item, 0)} style={imageStyle} alt={item.title} />
      <p>{item.description}</p>
    </div>
  )
}

export default ItemPage
