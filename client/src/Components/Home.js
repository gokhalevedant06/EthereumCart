import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router";
import SingleProduct from "./SingleProduct";
import { UserContext } from "./UserContext";
import { AdminContext } from "./AdminContext";
function Home() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const {isLoggedIn,setIsLoggedIn} = useContext(UserContext)
  const {setIsAdmin} = useContext(AdminContext)
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
      if(ResData.isAdmin){
        setIsAdmin(true)
      }
      console.log("User",ResData);
    } catch (err) {
      history.push("/login");
      console.log(err);
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
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllProducts();
    validateUser();
  // eslint-disable-next-line
  }, []);
  return (
    <>
    {
      isLoggedIn ? <>
      <p className="home_welcome">Hello, {data.name} Welcome To Ethereum Cart</p>
      {/* <h4>{data.email}</h4>
      {data.isAdmin ? <h4>Admin:True</h4>:<h4>Admin: False</h4>}
      <h4>{data.phone}</h4>
      <h4>{data._id}</h4> */}
      </> : <></>
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
