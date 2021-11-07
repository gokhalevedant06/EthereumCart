/* eslint-disable */
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = (props) => {
    const [cart, setCart] = useState([]);
    const [isLoggedIn,setIsLoggedIn] = useState(false);
  return <CartContext.Provider value={[cart,setCart],[isLoggedIn,setIsLoggedIn]}>{props.children}</CartContext.Provider>;
};
