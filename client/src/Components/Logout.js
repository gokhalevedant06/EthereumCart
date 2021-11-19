// eslint-disable-next-line
import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "./UserContext";
function Logout() {
  const {setIsLoggedIn} = useContext(UserContext)
  const history = useHistory();
  const userLogout = async () => {
    const res = await fetch("/logout", {
      method: "POST",
    });
    console.log(res);
    setIsLoggedIn(false)
    history.push("/");
  };
  useEffect(() => {
    if (window.confirm("Your session will be logged out")) {
      userLogout();
    } else {
      history.push("/");
    }
    // eslint-disable-next-line
  }, []);
  return <></>;
}

export default Logout;
