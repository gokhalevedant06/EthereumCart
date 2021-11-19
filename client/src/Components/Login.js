import React,{useState,useContext} from 'react'
import axios from "axios";
import { useHistory } from 'react-router'
import { Link } from "react-router-dom";
import { UserContext } from './UserContext';
function Login() {
  const history = useHistory();
  const {setIsLoggedIn} = useContext(UserContext)
    const [loginUser, setLoginUser] = useState();
    const onChange = (e) => {
      setLoginUser({
        ...loginUser,
        [e.target.name]: e.target.value,
      });
    };
  
    const userLogin = async () => {
      try {
        const response = await axios({
          method: "POST",
          url: "/login",
          data:loginUser
        });
        console.log(response);
        window.alert(response.data)
        setIsLoggedIn(true)
        history.push('/');
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
          <p>Login To Your Account</p>
         
          <input
            type="email"
            placeholder="Enter Your Email"
            name="email"
            onChange={onChange}
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={onChange}
          />
         
          <button onClick={userLogin}>
            Login <i className="fas fa-sign-in-alt fa-1x"></i>{" "}
          </button>

        <Link to='signup'>
         <p>New User ?</p> </Link> 
        </div>
      </div>
        </>
    )
}

export default Login
