import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/general/NavBar";
import Footer from "./components/general/Footer";
import Configuracion from "./components/config/Config";
import NotesView from "./components/notes/NotesView";
import Register from "./components/users/registro";
import Login from "./components/users/Login";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/general/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Route exact={true} path="/">
        <Home/>
      </Route>

      <Route exact={true} path="/notes">
        <NotesView/>
      </Route>

      <Route exact={true} path="/login">
       <Login/>
      </Route>

      <Route exact={true} path="/register">
        <Register />
      </Route>

      <Route exact={true} path="/account">
        <Configuracion />
      </Route>
      
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
