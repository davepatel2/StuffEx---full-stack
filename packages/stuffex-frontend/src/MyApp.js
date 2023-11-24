// src/MyApp.js

import Item from './Item'
import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Form from './components/Form'
import Navbar from './components/Navbar'
import About from './components/About'
import ItemPage from './ItemPage'
import UserItems from './UserItems'

function MyApp() {
  const [items, setItems] = useState([])

  const backendRoot = 'https://stuffex.azurewebsites.net'

  function populateItems(query) {
    fetchUsers(query)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setItems(json)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(populateItems, [])

  function fetchUsers(query) {
    const promise = fetch(`${backendRoot}/items${query ? '?q=' + query : ''}`)
    return promise
  }

  function postItem(item) {
    const promise = fetch(
      `${backendRoot}/users/6551b42036f9e0bfd4503186/items`,
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

  return (
    <div>
      <Navbar />
      <div className="container" style={{ margin: 60 }}>
        <Routes>
          <Route
            path="/"
            element={<Item itemData={items} updateItems={populateItems} />}
          />
          <Route path="/Form" element={<Form handleSubmit={updateList} />} />
          <Route path="/About" element={<About />} />
          <Route
            path="/item/:itemId"
            element={<ItemPage backendRoot={backendRoot} />}
          />
          <Route
            path="/user/:userId/items"
            element={<UserItems backendRoot={backendRoot} />}
          />{' '}
        </Routes>
        {/* <Item itemData={items} />
        <Form handleSubmit={updateList} /> */}
      </div>
    </div>
  )
}

export default MyApp
