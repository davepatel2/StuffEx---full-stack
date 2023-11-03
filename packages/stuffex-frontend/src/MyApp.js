// src/MyApp.js
import React from "react";
import Item from "./Item";
const items = [
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
];
function MyApp() {
  return (
    <div className="container">
      <h1>StuffEX</h1>
      <Item itemData={items} />
    </div>
  );
}
export default MyApp;
