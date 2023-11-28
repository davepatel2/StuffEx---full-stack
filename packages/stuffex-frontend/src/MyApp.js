// src/MyApp.js

import Item from './Item'
import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Form from './components/Form'
import Profile from './components/Profile'
import Navbar from './components/Navbar'
import About from './components/About'
import ItemPage from './ItemPage'
import UserItems from './UserItems'

function MyApp() {
  const [items, setItems] = useState([])
  const [users, setUsers] = useState([])

  const backendRoot = 'https://stuffex.azurewebsites.net'

  function populateItems(query) {
    fetchItems(query)
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

  function fetchItems(query) {
    const promise = fetch(`${backendRoot}/items${query ? '?q=' + query : ''}`)
    return promise
  }

  function populateUsers(query) {
    fetchUsers(query)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setUsers(json)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(populateUsers, [])

  function fetchUsers(query) {
    const promise = fetch(`${backendRoot}/users${query ? '?q=' + query : ''}`)
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

  function postUser(user) {
    const promise = fetch(`${backendRoot}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    return promise
  }

  function updateList(item) {
    postItem(item)
      .then(() => setItems([...items, item]))
      .catch((error) => {
        console.log(error)
      })
  }

  function updateUser(user) {
    postUser(user)
      .then(() => setUsers([...users, user]))
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
            path="/Profile"
            element={<Profile handleProfile={updateUser} />}
          />
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
