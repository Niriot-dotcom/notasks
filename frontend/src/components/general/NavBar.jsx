import React, { useContext } from "react";
import "./navbar.css";
// import {"https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"};
import AuthContext from "../../AuthContext.js"


function NavBar() {
  const isLogged = localStorage.getItem("isLogged");
  console.log(isLogged);

  const [loggedIn, setLoggedIn] = useContext(AuthContext);

  return (
    <nav>
      <div className="logo">NOTASKs</div>
      <input type="checkbox" id="click" />
      <label htmlFor="click" className="menu-btn">
        <i className="bx bx-menu"></i>
      </label>
      <ul>
        {!loggedIn && <li>
          <a href="/home">Inicio</a>
        </li>
        }
        {!loggedIn &&
          <li>
            <a href="/login">Entrar</a>
          </li>
        }
        {!loggedIn &&
          <li>
            <a href="/register">Registrarse</a>
          </li>
        }
        
        {loggedIn && <li>
          <a href="/perfil">Perfil</a>
        </li>}
        {loggedIn && (
          <li>
            <a href="/notes">Notas</a>
          </li>
        )}
        {loggedIn && (
          <li>
            <a href="/logout">Salir</a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
