import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router";
import { CartContext } from "./Context";
function Home() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [isLoggedIn, setLoggedIn] = useContext(CartContext);
  const validateUser = async () => {
    try {
      const res = await fetch("/home", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const ResData = await res.json();
      setData(ResData);
      setLoggedIn(true);
      console.log(ResData);
    } catch (err) {
      history.push("/login");
      console.log(err);
      window.alert("You need to be logged in to access this page");
    }
  };

  useEffect(() => {
    validateUser();
  }, []);
  return (
    <>
    {
      isLoggedIn ? <><h1>This is home page</h1>
      <h4>{data.name}</h4>
      <h4>{data.email}</h4>
      <h4>{data.isAdmin}</h4>
      <h4>{data.phone}</h4>
      <h4>{data._id}</h4></> : <></>
    }
    
    </>
  );
}

export default Home;
