import React, { useEffect, useState } from "react";
import "./navbar.css";
// import {"https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"};

function NavBar() {
  const [isLogged, setLogged] = useState();
  console.log("isLogged", isLogged);

  useEffect(() => {
    setLogged(localStorage.getItem("isLogged"));
  }, []);


  return (
    <nav>
      <div className="logo">NOTASKs</div>
      {/* <div className="logo">{count}</div> */}
      <input type="checkbox" id="click" />
      <label htmlFor="click" className="menu-btn">
        <i className="bx bx-menu"></i>
      </label>
      <ul>
        <li>
          <a href="/home">Inicio</a>
        </li>
        {!isLogged && (
          <li>
            <a href="/login">Entrar</a>
          </li>
        )}
        {!isLogged && (
          <li>
            <a href="/register">Registrarse</a>
          </li>
        )}
        {isLogged && (
          <li>
            <a href="/perfil">Perfil</a>
          </li>
        )}
        {/* <li><a href="/calendar">Calendario</a></li> */}
        {/* <li><a href="/payments">Pagos</a></li> */}
        {isLogged && (
          <li>
            <a href="/notes">Notas</a>
          </li>
        )}
        {isLogged && (
          <li>
            <a href="/account">Mi cuenta</a>
          </li>
        )}
        {/*<li><a href="/notes">Notas</a></li>*/}
        {/* <li><a href="/progress">Progreso</a></li> */}
      </ul>
    </nav>
  );
}

export default NavBar;
