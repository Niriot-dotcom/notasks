import React from "react";
import NotesView from "./components/notes/NotesView";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateNote from "./components/notes/CreateNote";
import Navbar from "./components/general/NavBar";

function App() {
  return (
    <div>
      <Navbar />
      <NotesView />
      <CreateNote />
    </div>
  );
}

export default App;
