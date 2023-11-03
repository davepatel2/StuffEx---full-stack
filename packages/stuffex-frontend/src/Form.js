// src/Form.js
import React, {useState} from 'react';

function Form(props) {
  const [item, setitem] = useState(
     {
        title: "",
        image: "",
        description:"",
     }
  );

  function submitForm() {
    props.handleSubmit(item);
    setitem({title: '', image: '', description:''});
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "title")
      setitem(
         {title: value, image: item['image'], description : item['description']}
      );
    else if( name === 'image')   
       setitem(
         {title: item['title'], image: value, description: item['description']}   
       );
    else
      setitem(
        {title: item['title'], image: item['image'], description: value}   
      );
  }

  return (
    <form>
      <label htmlFor="title">title</label>
      <input
        type="text"
        name="title"
        id="title"
        value={item.title}
        onChange={handleChange} />
      <label htmlFor="image">image</label>
      <input
        type="text"
        name="image"
        id="image"
        value={item.image}
        onChange={handleChange} />
        <label htmlFor="description">description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={item.description}
        onChange={handleChange} />
        <input type="button" value="Submit" onClick={submitForm} /> 
    </form>
);

}


export default Form;