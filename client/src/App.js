import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Cart from "./Components/Cart";
import Logout from "./Components/Logout";
import Products from "./Components/Products";
import "./App.css";
import { CartProvider } from "./Components/Context";

function App() {
  return (
    <>
    <CartProvider>
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
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/logout" exact>
              <Logout />
            </Route>
            <Route path="/products" exact>
              <Products />
            </Route>
         
          </Switch>
      </Router>
</CartProvider>
    </>
  );
}

export default App;
