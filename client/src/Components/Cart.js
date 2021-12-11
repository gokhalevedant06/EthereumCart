import React, { useEffect, useState, useContext } from "react";
import { CartState } from "./Context";
import { Link } from "react-router-dom";
import { TotalContext } from "./TotalContext";

function Cart() {
  const {setFinalAmount} = useContext(TotalContext)
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
              <div className="product-price">${product.price}<br /> {product.price*0.00025} ETH</div>
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
        <h1>Total Amount: ${total}</h1>
        <h1>Total Amount in ETH: {total*0.00025} ETH</h1>
        <Link to="/checkout">
          <button className="checkout_button" onClick={() => {
            setFinalAmount(total);
          }}>
            Checkout
          </button>
        </Link>
      </div>
    </>
  );
}

export default Cart;
