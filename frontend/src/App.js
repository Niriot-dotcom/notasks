import React, { createContext, useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/general/NavBar";
import Configuracion from "./components/config/Config";
import NotesView from "./components/notes/NotesView";
import Register from "./components/users/registro";
import Login from "./components/users/Login";
import Salir from "./components/users/Salir";
import Perfil from "./components/Progreso/Perfil";
import { BrowserRouter, Route } from "react-router-dom";

export const LoginContext = createContext({
  Login: false,
  setLogin: () => {},
});

function App() {
  const [login, setLogin] = useState(false);
  const value = useMemo(() => ({ login, setLogin }), [login]);

  return (
      <LoginContext.Provider value={value}>
        <BrowserRouter>
          <Navbar />

          <Route exact={true} path="/notes">
            <NotesView />
          </Route>

          <Route exact={true} path="/login">
            <Login />
          </Route>

          <Route exact={true} path="/register">
            <Register />
          </Route>

          <Route exact={true} path="/account">
            <Configuracion />
          </Route>

          <Route exact={true} path="/salir">
            <Salir />
          </Route>

          <Route exact={true} path="/perfil">
            <Perfil />
          </Route>

        </BrowserRouter>
      </LoginContext.Provider>
  );
}

export default App;
