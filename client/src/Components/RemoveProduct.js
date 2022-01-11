import React,{useEffect,useState} from'react'
import SingleProductRemove from "./SingleProductRemove";

function RemoveProduct() {
  const [products, setProducts] = useState([]);
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
      // eslint-disable-next-line
      }, [products]);


    return (
        <>
           <div className="product_container">
{
 products.map((product)=>{
   return <SingleProductRemove product = {product} key={product._id}/>
  })
}
  </div>
        </>
    )
}

export default RemoveProduct
