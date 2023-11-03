// src/MyApp.js

import Item from "./Item";
import React, {useState} from 'react';
import Form from './Form';

function MyApp() {
  const [items, setItems] = useState([
    {
    title: "Apple",
    image: "example.jpg",
    description: "hello",
    },
    {
    title: "ball",
    image:"ball.jpg",
    description:"Hi im a ball",
    },
  ]);

  function updateList(listing) {
    setItems([...items, listing]);
  }
  return (
    <div className="container">
      <h1>StuffEX</h1>
      <Item itemData={items} />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;
