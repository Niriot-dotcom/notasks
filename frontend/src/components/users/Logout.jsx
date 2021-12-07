import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../AuthContext.js"


function Logout() {
    const [loggedIn, setLoggedIn] = useContext(AuthContext);
    setLoggedIn(false);

    localStorage.setItem("id", "");
    localStorage.setItem("isLogged", false);

    return <Redirect to={{ pathname: "/home" }} />
};

export default Logout;