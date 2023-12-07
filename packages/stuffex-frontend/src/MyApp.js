// src/MyApp.js

import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Form from './components/Form'
import Profile from './components/Profile'
import Navbar from './components/Navbar'
import About from './components/About'
import Test from './components/Test'
import ItemPage from './ItemPage'
import UserSellingItems from './UserSellingItems'
import UserWishlistItems from './UserWishlistItems'
import UserBoughtItems from './UserBoughtItems'
import UserPage from './UserPage'
import Login from './components/Login'
import Authentication from './authentication/Authentication'
import HomePage from './components/HomePage'

import { backendRoot } from './AppConfig'

function MyApp() {
  const [items, setItems] = useState([])
  const [users, setUsers] = useState([])

  function populateItems(query) {
    fetchItems(query)
      .then((res) => res.json())
      // Reverse order of items
      .then((json) => json.reverse())
      // Remove items that are already sold
      .then((json) => json.filter((item) => !item.buyer_id))
      // Log the resulting item list for debugging, then save it
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
    return new Promise((resolve, reject) => {
      if (!Authentication.isLoggedIn()) {
        reject('Sign in before posting an item')
      }

      const { token, userId } = Authentication.getSessionCredentials()

      fetch(`${backendRoot}/users/${userId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Token ${token}`,
        },
        body: JSON.stringify(item),
      })
        .then((res) => console.log(res))
        .catch((e) => reject(e))
    })
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
      <Navbar updateItems={populateItems} />
      <div className="container" style={{ margin: 60 }}>
        <Routes>
          <Route
            path="/"
            element={<HomePage items={items} populateItems={populateItems} />}
          />
          <Route path="/Form" element={<Form handleSubmit={updateList} />} />
          <Route path="/About" element={<About />} />
          <Route path="/Test" element={<Test />} />
          <Route
            path="/Profile"
            element={<Profile handleProfile={updateUser} />}
          />
          <Route
            path="/item/:itemId"
            element={<ItemPage backendRoot={backendRoot} />}
          />
          <Route
            path="/users/:userId/items"
            element={<UserSellingItems backendRoot={backendRoot} />}
          />
          <Route
            path="/users/:userId/wishlist"
            element={<UserWishlistItems backendRoot={backendRoot} />}
          />
          <Route
            path="/users/:userId/items_bought"
            element={<UserBoughtItems backendRoot={backendRoot} />}
          />
          <Route
            path="/users/:userId"
            element={<UserPage backendRoot={backendRoot} />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* <Item itemData={items} />
        <Form handleSubmit={updateList} /> */}
      </div>
    </div>
  )
}

export default MyApp
