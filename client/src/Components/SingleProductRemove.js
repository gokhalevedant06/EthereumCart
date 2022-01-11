import React from "react";
import Rating from "./Rating";
import axios from "axios";

function SingleProductRemove({product}) {
  
  const deleteItem =async (e)=>{
    e.preventDefault();
    let name = {
      name:product.productName
    }
    const response = await axios({
      method: "POST",
      url: "/product/delete",
      data: name,
    });
    console.log(response);
  }


  return (
    <div className="product-card">
      <div className="logo-cart">
        <i className="bx bx-shopping-bag"></i>
      </div>
      <div className="main-images">
        <img src={product.imageName} alt={product.productName} />
      </div>
      <div className="shoe-details">
        <span className="shoe_name">{product.productName}</span>
        <p>Category: {product.category}</p>
      </div>
      <div>
        <Rating rating={product.rating} />
      </div>
      <div className="color-price">
        <div className="price">
          <span className="price_num">${product.price} </span>
          <span className="price_num"></span>
        </div>
      </div>
      <button onClick={deleteItem} className="delete-button">Delete</button>
    </div>
  );
}

export default SingleProductRemove;
