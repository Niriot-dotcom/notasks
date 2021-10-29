import React from "react";
import NotesView from "./components/notes/NotesView";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from "react-bootstrap";
import CreateNote from "./components/notes/CreateNote";

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
