// src/MyApp.js
import React from "react";

function ItemHeader() {
  return (
    <div style={{ textAlign: "center", fontSize: "24px", padding: "20px 0" }}>
      Recently Posted
    </div>
  );
}

function ItemBody(props) {
  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    padding: "10px",
  };

  const itemStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "contain",
  };

  const rows = props.itemData.map((item, index) => {
    return (
      <div style={itemStyle} key={index}>
        <div>{item.title}</div>
        <img src={item.image} alt="" style={imageStyle} />
        <div>{item.description}</div>
      </div>
    );
  });

  return <div style={gridContainerStyle}>{rows}</div>;
}

function Item(props) {
  return (
    <div>
      <ItemHeader />
      <ItemBody itemData={props.itemData} />
    </div>
  );
}

export default Item;
