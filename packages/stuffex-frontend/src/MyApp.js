// src/MyApp.js

import Item from './Item'

import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Navbar from './components/Navbar'

function MyApp() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setItems(json)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  function fetchUsers() {
    const promise = fetch('https://stuffex.azurewebsites.net/items')
    return promise
  }
  function postItem(item) {
    const promise = fetch(
      'https://stuffex.azurewebsites.net/users/6551b42036f9e0bfd4503186/items',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      }
    )

    return promise
  }

  function updateList(person) {
    postItem(person)
      .then(() => setItems([...items, person]))
      .catch((error) => {
        console.log(error)
      })
  }

  // function updateList(listing) {
  //   setItems([...items, listing]);
  // }

  return (
    <div>
      <Navbar />
      <div className="container" style={{ margin: 60 }}>
        <Item itemData={items} />
        <Form handleSubmit={updateList} />
      </div>
    </div>
  )
}

export default MyApp
