import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NotesView from "./components/notes/NotesView";
import CreateNote from "./components/notes/CreateNote";
import Navbar from "./components/general/NavBar";
import Registro from "./components/users/registro";

/*
      <Navbar />
      <NotesView />
      <CreateNote />
*/

function App() {
  return (
    <div>

      <Registro />
    </div>
  );
}

export default App;
