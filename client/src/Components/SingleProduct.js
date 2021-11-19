import React from "react";
import { CartState } from "./Context";
import Rating from "./Rating";
const SingleProduct = ({ product }) => {
  const {
    state,
    dispatch,
  } = CartState();
  return (
    <>
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
            <span className="price_num">${product.price}</span>
          </div>
        </div>
        <div className="button">
          <div className="button-layer"></div>
          
              {
                  !state.cart.some(p => p._id===product._id) ? <><button onClick={()=>{
                      dispatch(
                          {
                           type:'ADD_TO_CART',
                           payload: product
                          }
                      )
                  }}>Add To Cart</button></>:<><button onClick={()=>{
                    dispatch(
                        {
                         type:'REMOVE_FROM_CART',
                         payload: product
                        }
                    )
                }}>Remove From Cart</button></>
              }
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
