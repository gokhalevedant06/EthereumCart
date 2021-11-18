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
      <div class="product-card">
        <div class="logo-cart">
          <i class="bx bx-shopping-bag"></i>
        </div>
        <div class="main-images">
          <img src={product.imageName} />
        </div>
        <div class="shoe-details">
          <span class="shoe_name">{product.productName}</span>
          <p>Category: {product.category}</p>
        </div>
        <div>
          <Rating rating={product.rating} />
        </div>
        <div class="color-price">
          <div class="price">
            <span class="price_num">${product.price}</span>
          </div>
        </div>
        <div class="button">
          <div class="button-layer"></div>
          
              {
                  !state.cart.some(p => p._id===product._id) ? <><button onClick={()=>{
                      dispatch(
                          {
                           type:'ADD_TO_CART',
                           payload: product
                          }
                      )
                  }}>Add To Cart</button></>:<><button onClick={()=>{
                      console.log(state.cart)
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
