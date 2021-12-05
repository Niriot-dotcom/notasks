import React, { useEffect } from "react";
import "./navbar.css";
// import {"https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"};

function NavBar() {
  const isLogged = localStorage.getItem("isLogged");
  console.log(isLogged);

  return (
    <nav>
      <div className="logo">NOTASKs</div>
      <input type="checkbox" id="click" />
      <label htmlFor="click" className="menu-btn">
        <i className="bx bx-menu"></i>
      </label>
      <ul>
        <li>
          <a href="/home">Inicio</a>
        </li>
        <li>
          <a href="/login">Entrar</a>
        </li>
        <li>
          <a href="/register">Registrarse</a>
        </li>
        <li>
          <a href="/perfil">Perfil</a>
        </li>
        {/* <li><a href="/calendar">Calendario</a></li> */}
        {/* <li><a href="/payments">Pagos</a></li> */}
        {isLogged && (
          <li>
            <a href="/notes">Notas</a>
          </li>
        )}
        {/*<li><a href="/notes">Notas</a></li>*/}
        {/* <li><a href="/progress">Progreso</a></li> */}
      </ul>
    </nav>
  );
}

export default NavBar;
