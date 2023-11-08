// src/MyApp.js

import Item from "./Item";
import React, { useState } from "react";
import Form from "./components/Form";
import Navbar from "./components/Navbar";

function MyApp() {
  const [items, setItems] = useState([
    {
      title: "Apple",
      image: "example.jpg",
      description: "hello",
    },
    {
      title: "ball",
      image: "ball.jpg",
      description: "Hi im a ball",
    },
  ]);

  function updateList(listing) {
    setItems([...items, listing]);
  }
  return (
    <div>
      <Navbar />
      <div className="container" style={{ margin: 60 }}>
        <Item itemData={items} />
        <Form handleSubmit={updateList} />
      </div>
    </div>
  );
}

export default MyApp;
