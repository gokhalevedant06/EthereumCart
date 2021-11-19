import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./css/style.css";
import { UserContext } from "./UserContext";
import { CartState } from "./Context";
import { AdminContext } from "./AdminContext";
function Navbar() {
  const { isLoggedIn } = useContext(UserContext);
  const { isAdmin } = useContext(AdminContext);
  const [click, setClick] = useState(false);
  const { state } = CartState();
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

          {isLoggedIn === true ? (
            <>
              <li className="nav-item">
                <Link
                  to="/cart"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <p>Cart [{state.cart.length}] </p>
                </Link>
              </li>{" "}
              {isAdmin ? (
                <>
                  <li className="nav-item">
                    <Link
                      to="/manage"
                      className="nav-links"
                      onClick={closeMobileMenu}
                    >
                      <p>Manage</p>
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}
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
