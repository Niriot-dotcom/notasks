import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NotesView from "./components/notes/NotesView";
import CreateNote from "./components/notes/CreateNote";
import Navbar from "./components/general/NavBar";
import Registro from "./components/users/registro";
import Login from "./components/users/Login";

/*
      <Navbar />
      <NotesView />
      <CreateNote />
*/

function App() {
  return (
    <div>
      <Registro />
      <Login />
    </div>
  );
}

export default App;
