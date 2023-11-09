// src/Form.js
import React, { useState } from 'react'

function Form(props) {
  const [item, setItem] = useState({
    title: '',
    image: '',
    description: '',
  })

  function submitForm() {
    props.handleSubmit(item)
    setItem({ title: '', image: '', description: '' })
  }

  function handleChange(event) {
    const { name, value } = event.target
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function handleImageChange(event) {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setItem((prevState) => ({
          ...prevState,
          image: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={item.title}
        onChange={handleChange}
      />
      <label htmlFor="image">Image Upload</label>
      <input type="file" name="image" id="image" onChange={handleImageChange} />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={item.description}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  )
}

export default Form
