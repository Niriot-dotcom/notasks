import React , {useContext}from "react";
import { Redirect } from 'react-router-dom'
import { LoginContext } from "../../App.js";

function Salir() {
    const { setLogin } = useContext(LoginContext);
    setLogin(false);
    localStorage.setItem("isLogged", false);
    return <Redirect to={{ pathname: "/login" }} />
}

export default Salir;