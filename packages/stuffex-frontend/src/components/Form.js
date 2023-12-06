// Importing necessary React hooks and CSS for the form
import React, { useState, useRef } from 'react'
import './form.css'

// Functional component Form with props passed from parent component
function Form({ handleSubmit }) {
  // State for managing form data
  const [item, setItem] = useState({
    title: '',
    images: [],
    description: '',
  })

  // State for managing form validation errors
  const [errors, setErrors] = useState({})

  // Reference to the file input for managing file uploads
  const fileInputRef = useRef(null)

  // Function to validate form data
  function validateForm() {
    const newErrors = {}
    // Check if title is empty and add to errors if so
    if (!item.title.trim()) {
      newErrors.title = true
    }
    // Check if description is empty and add to errors if so
    if (!item.description.trim()) {
      newErrors.description = true
    }
    return newErrors
  }

  // Function to handle form submission
  function submitForm() {
    const formErrors = validateForm()
    // If no errors, submit the form and reset the state
    if (Object.keys(formErrors).length === 0) {
      handleSubmit(item)
      setItem({ title: '', images: [], description: '' })
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } else {
      setErrors(formErrors)
    }
  }

  // Function to handle changes in form inputs
  function handleChange(event) {
    const { name, value } = event.target
    // Update form data state
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: false }))
    }
  }

  // Function to handle image file selection and read as data URL
  function handleImageChange(event) {
    const files = Array.from(event.target.files)
    // For each file, read and add to the image array in state
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setItem((prevState) => ({
          ...prevState,
          images: [...prevState.images, reader.result],
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  // Function to handle deletion of a selected image
  function handleDeleteImage(indexToDelete) {
    // Update state to remove the selected image
    setItem((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, index) => index !== indexToDelete),
    }))
  }

  // Render the form with input fields and handling errors
  return (
    <form>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        value={item.title}
        onChange={handleChange}
        className={errors.title ? 'input-error' : ''}
      />

      <label htmlFor="images">Image Upload:</label>
      <input
        type="file"
        name="images"
        id="images"
        ref={fileInputRef}
        onChange={handleImageChange}
        multiple
      />

      <div className="image-upload-container">
        {item.images.map((imageSrc, index) => (
          <div key={index} className="image-container">
            <img
              src={imageSrc}
              alt={`uploaded-${index}`}
              className="uploaded-image"
            />
            <button
              type="button"
              className="delete-button"
              onClick={() => handleDeleteImage(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <label htmlFor="description">Description:</label>
      <textarea
        name="description"
        id="description"
        value={item.description}
        onChange={handleChange}
        rows={4}
        className={errors.description ? 'input-error' : ''}
      />

      <input
        type="button"
        className="list-button"
        value="List Item"
        onClick={submitForm}
      />
    </form>
  )
}

// Exporting the Form component for use in other parts of the application
export default Form
