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
            <li><a class="active" href="#">Inicio</a></li>
            <li><a href="#">Entrar</a></li>
            <li><a href="#">Registrarse</a></li>
            <li><a href="#">Cuenta</a></li>
            <li><a href="#">Calendario</a></li>
            <li><a href="#">Pagos</a></li>
            <li><a href="#">Progreso</a></li>
        </ul>
    </nav>
    );
}

export default NavBar;
