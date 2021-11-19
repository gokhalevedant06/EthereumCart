import React, { useState } from "react";
import "./css/style.css";
import axios from "axios";
import { useHistory } from "react-router";
function Signup() {
  const history = useHistory();
  const [signUp, setSignup] = useState();
  const onChange = (e) => {
    setSignup({
      ...signUp,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "/signup",
        data:signUp
      });
      console.log(response);
      window.alert(response.data)
      history.push('/login')
    } catch (error) {
      window.alert("Try Again!")
      console.log(error);
    }
  };
  return (
    <>
      <div className="fcontainer">
        <div className="left">
          <p id="welcomeLogin">Welcome To EthereumCart</p>
          <img className="left_logo" src="LogoBlackTransparent.png" alt="" />
        </div>
        <div className="right">
          <p>Create A New Account</p>
          <input
            type="text"
            placeholder="Enter Your Name"
            name="name"
            onChange={onChange}
          />
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            onChange={onChange}
          />
          <input
            type="number"
            placeholder="Enter Phone Number"
            name="phone"
            onChange={onChange}
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={onChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="cpassword"
            onChange={onChange}
          />
          <button onClick={createUser}>
            Create Account <i className="fas fa-sign-in-alt fa-1x"></i>{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default Signup;
