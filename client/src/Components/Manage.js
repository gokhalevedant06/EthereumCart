import React, { useContext, useState } from "react";
import RemoveProduct from "./RemoveProduct";
import AddProduct from "./AddProduct";
import { AdminContext } from "./AdminContext";
function Manage() {
  const { isAdmin } = useContext(AdminContext);
  const [showAdd, setShowAdd] = useState(false)
  const [showRemove, setShowRemove] = useState(false)
  const addProduct = ()=>{
      setShowAdd(true)
      setShowRemove(false)
  }
  const removeProduct = ()=>{
    setShowRemove(true)
    setShowAdd(false)
  }
  return (
    <>
      {isAdmin ? (
        <>
      <div className="manage-container">
          <button onClick={addProduct}>Add Products</button>
          <button onClick={removeProduct}>Delete Products</button>
      </div>
      {showAdd && <AddProduct/>}
      {showRemove && <RemoveProduct/>}
        </>
      ) : (
        <>
          <h1>Unauthorized</h1>
        </>
      )}
    </>
  );
}

export default Manage;
