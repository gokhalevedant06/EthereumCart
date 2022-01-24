import React, { useState } from "react";
import axios from "axios";

function AddProduct() {
  const [name,setName] =useState()
  const [rating,setRating] = useState()
  const [price,setPrice] = useState()
  const [category, setCategory] = useState()
  const [file,setFile] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();
    let image = file;
    console.log(image)
    let form = new FormData();
    form.append("productName",name);
    form.append("description",category);
    form.append("price",price);
    form.append("rating",rating);
    form.append("image",file);
    const response = await axios({
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      url: "/product/add",
      data: form,
    });
    console.log(response);
    window.alert(response.data)
  };
  return (
    <>
      <div className="add-products">
        <input
          type="text"
          name="productName"
          onChange={(e)=>{
            setName(e.target.value)
          }}
          placeholder="Enter Product Name"
        />
        <br />
        <input
          type="text"
          name="Category"
          onChange={(e)=>{
            setCategory(e.target.value)
          }}
          placeholder="Enter Product Category"
        />
        <br />
        <input
          type="number"
          name="price"
          onChange={(e)=>{
            setPrice(e.target.value)
          }}
          placeholder="Enter Price in $"
        />
        <br />
        <input
          type="number"
          name="rating"
          onChange={(e)=>{
            setRating(e.target.value)
          }}
          id=""
          placeholder="Rate Your Product"
        />
        <br />
        <input type="file" name="imageName" onChange={(e)=>{
          setFile(e.target.files[0])
        }} />
        <br />

        <button onClick={handleSubmit}>Add Product</button>
      </div>
    </>
  );
}

export default AddProduct;
