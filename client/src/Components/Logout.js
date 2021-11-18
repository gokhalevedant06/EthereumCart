import React,{useEffect, useContext} from 'react'
import { useHistory } from 'react-router'
import { CartContext } from "./Context";

function Logout() {
  const [isLoggedIn, setLoggedIn] = useContext(CartContext);
    const history = useHistory();
    const userLogout = async()=>{
        const res = await fetch('/logout',{
            method:"POST"
        })
        console.log(res)
        setLoggedIn(false)
        history.push('/')
    }

    useEffect(() => {
        if(window.confirm("Your session will be logged out")){
            userLogout();
        }else{
            history.push('/')
        }
    }, [])
    return (
        <>
            
        </>
    )
}

export default Logout
