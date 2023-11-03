// src/MyApp.js
import React from "react";


function ItemHeader() {
  return (
    <thead>
      <tr>
        <th>Available Items</th>
        
      </tr>
    </thead>
  );
}

function ItemBody(props) {
  //this is the border around the item listing
  const listingStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    
    display: 'inline-block', 
  };

  const rows = props.itemData.map((row, index) => {
    return (
      //displays the variables of the item
      <table style={listingStyle}>
      <><tr key={index}>
        <td>{row.title}</td></tr><tr> <td>{<img src={row.image} alt= {""}/>}</td></tr><tr> <td>{row.description}</td>
        </tr></>
        </table>);
        
   }
  );
  return (
    
      <tbody>
        {rows}
       </tbody>
      
   );
}

  // return (
  //   <div className="item-listing" style={listingStyle}>
  //     <div className="item-image">
  //       {/* <img src={image} alt={title} /> */}
  //     </div>
  //     <div className="item-details">
  //       <h2>{props.itemName}</h2>
  //       <p>{props.userName}</p>
  //     </div>
  //   </div>
  // );
// }

function Item(props) {
  return (
    <table>
      <ItemHeader />
      <ItemBody itemData={props.itemData} />
    </table>
  );
}

export default Item;
