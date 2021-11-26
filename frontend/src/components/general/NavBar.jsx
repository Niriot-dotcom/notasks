import React, {useContext, useEffect} from "react";
import './navbar.css'
import { LoginContext } from "../../App";

function NavBar() {
    const {login, setLogin} = useContext(LoginContext);
    const isLogged = localStorage.getItem("isLogged");

    console.log("El usuario ha sido loggeado",  login);


    return (
        <nav>
        <div className="logo">NOTASKs</div>
        <input type="checkbox" id="click"/>
        <label htmlFor="click" className="menu-btn">
            <i className='bx bx-menu'></i>
        </label>
        <ul>
            <li><a className="active" href="/home">Inicio</a></li>
            {!login && <li><a href="/login">Entrar</a></li>}
            {!login && <li><a href="/register">Registrarse</a></li>}
            {/* <li><a href="/profile">Cuenta</a></li> */}
            {/* <li><a href="/calendar">Calendario</a></li> */}
            {/* <li><a href="/payments">Pagos</a></li> */}
            {login && <li><a href="/notes">Notas</a></li>}
            {login && <li><a href="/account">Mi cuenta</a></li>}
            {login && <li><a href="/Salir">Cerrar Sesión</a></li>}
            {login && <li><a href="/perfil">Perfil</a></li> }
        </ul>
    </nav>
    );
}

export default NavBar;
