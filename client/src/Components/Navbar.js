/* eslint-disable */
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import { CartContext } from "./Context";
function Navbar() {
  const [cart] = useContext(CartContext);
  const [isLoggedIn, setLoggedIn] = useContext(CartContext);
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenu = () => {
    setClick(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <p>EthereumCart</p>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              <p>Home</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/products"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              <p>Products </p>
            </Link>
          </li>

          {isLoggedIn === true ? (
            <>
              <li className="nav-item">
                <Link
                  to="/cart"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <p>Cart </p>
                </Link>
              </li>{" "}
              <li className="nav-item">
                <Link
                  to="/logout"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <p>Logout</p>
                </Link>
              </li>
            </>
          ) : (
            <>
              {" "}
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <p>Login</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signup"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <p>Signup</p>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
