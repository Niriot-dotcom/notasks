import React, { useEffect, useContext } from "react";
import './navbar.css'

function HomePage() {
    const {login, setLogin} = useContext(LoginContext);
    if(login){
        setLogin(true);
    }
    return (
        <div className="">

        </div>
    );
}

export default HomePage;
