import React, { useContext, useEffect, useState } from "react";
import { CartState } from "./Context";
import { cartReducer } from "./Reducers";

function Cart() {
  const { state, dispatch } = CartState();
  //   console.log("CArt Sate",state.cart[0].price)

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      state.cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [state.cart]);
  return (
    <>
      <div className="cart_container">
        {state.cart.map((product) => (
          <>
            <div className="cart_products">
              <div class="product-image">
                <img src={product.imageName} />
              </div>
              <div class="product-details">
                <div class="product-title">{product.productName}</div>
              </div>
              <div class="product-price">${product.price}</div>
              <div class="product-quantity">
                <input
                  type="number"
                  min="1"
                  placeholder="Quantity"
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_CART_QUANTITY",
                      payload: {
                        id: product._id,
                        qty: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div class="product-removal">
                <button
                  class="remove-product"
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: product,
                    });
                  }}
                >
                  {" "}
                  Remove
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="cart_col">
        <h1>Subtotal ({state.cart.length}) items</h1>
        <h1>${total}</h1>
        <button class="checkout">Checkout</button>
      </div>
    </>
  );
}

export default Cart;
