import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Cart from "./Components/Cart";
import Logout from "./Components/Logout";
import Checkout from "./Components/Checkout";
import "./App.css";
import { UserContext } from "./Components/UserContext";
import { useState } from "react";
import { AdminContext } from "./Components/AdminContext";
import { TotalContext } from "./Components/TotalContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);
  return (
    <>
      <TotalContext.Provider value={{ finalAmount, setFinalAmount }}>
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
            <Router>
              <Navbar />
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/cart" exact>
                  <Cart />
                </Route>
                <Route path="/signup" exact>
                  <Signup />
                </Route>
                <Route path="/checkout" exact>
                  <Checkout />
                </Route>
                <Route path="/login" exact>
                  <Login />
                </Route>
                <Route path="/logout" exact>
                  <Logout />
                </Route>
              </Switch>
            </Router>
          </AdminContext.Provider>
        </UserContext.Provider>
      </TotalContext.Provider>
    </>
  );
}

export default App;
