import React from "react";
import NotesView from "./components/notes/NotesView";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateNote from "./components/notes/CreateNote";
import Navbar from "./components/general/NavBar";
import Configuracion from "./components/config/Config";

function App() {
  return (
    <div>
      <Navbar />
      <Configuracion/>
    </div>
  );
}

export default App;
