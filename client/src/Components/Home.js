import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router";
import SingleProduct from "./SingleProduct";
import {CartState} from '../Components/Context'
import { UserContext } from "./UserContext";

function Home() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const {state} = CartState();
  const {isLoggedIn,setIsLoggedIn} = useContext(UserContext)

  console.log("This is state",state)
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
      setIsLoggedIn(true);
      
      console.log(ResData);
    } catch (err) {
      history.push("/login");
      console.log(err);
      window.alert("You need to be logged in to access this page");
    }
  };

  const getAllProducts = async()=>{
    try {
      const res = await fetch("product/get", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await res.json();
      setProducts(resData)
      console.log("Products",products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllProducts();
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

<div className="product_container">
{
 products.map((product)=>{
   return <SingleProduct product = {product} key={product._id}/>
     
  
  })
}
  </div>


    
    </>
  );
}

export default Home;
