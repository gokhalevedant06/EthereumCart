import React, { useEffect, useState } from "react";
import { CartState } from "./Context";

function Cart() {
  const { state, dispatch } = CartState();
  const [total, setTotal] = useState(0);
// eslint-disable-next-line
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
              <div className="product-image">
                <img src={product.imageName} alt={product.productName} />
              </div>
              <div className="product-details">
                <div className="product-title">{product.productName}</div>
              </div>
              <div className="product-price">${product.price}</div>
              <div className="product-quantity">
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
              <div className="product-removal">
                <button
                  className="remove-product"
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
        <button className="checkout" onClick={()=>{
        }}>Checkout</button>
      </div>
    </>
  );
}

export default Cart;
