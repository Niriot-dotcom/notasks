import React from "react";
import './navbar.css'

function NavBar() {
    return (
        <nav>
        <div class="logo">NOTASK</div>
        <input type="checkbox" id="click"/>
        <label for="click" class="menu-btn">
            <i class='bx bx-menu'></i>
        </label>
        <ul>
            <li><a class="active" href="/home">Inicio</a></li>
            <li><a href="/login">Entrar</a></li>
            <li><a href="/register">Registrarse</a></li>
            <li><a href="/profile">Cuenta</a></li>
            <li><a href="/calendar">Calendario</a></li>
            {/* <li><a href="/payments">Pagos</a></li> */}
            <li><a href="/notes">Notas</a></li>
            <li><a href="/progress">Progreso</a></li>
        </ul>
    </nav>
    );
}

export default NavBar;
