import React, { useState, useEffect } from "react";
import CreateNote from "./CreateNote";
import { ObjectId } from "bson";
import axios from "axios";
import "./styles.css";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Card from "react-bootstrap/Card";

const MySwal = withReactContent(Swal);

function NotesView() {
  const [notes, setNotes] = useState([
    {
      id: ObjectId(),
      titulo: "",
      descripcion: "",
    },
  ]);
  const [loading, setLoading] = useState(true);

  const handleDelete = (idNote) => {
    axios({
      url: "http://localhost:8080/api/notes/delete/" + idNote,
      method: "DELETE",
    })
      .then((response) => {
        console.log("Data has been sent to the server!", response.data);
      })
      .catch((error) => {
        console.log("Internal server error: ", error);
      })
      .finally(setLoading(loading - 1));
  };

  useEffect(() => {
    axios({
      url: "http://localhost:8080/api/notes",
      method: "GET",
    })
      .then((response) => {
        console.log("Data has been sent to the server!", response.data);
        setNotes(response.data);
      })
      .catch((error) => {
        console.log("Internal server error: ", error);
      });
  }, [loading]);

  return (
    <div>
      <h1>Notas de la Semana</h1>
      <div>
        <div className="grid">
          {notes.map((notas, index) => {
            return (
              <Card key={index}>
                <Card.Header>
                  <div align="right">
                    <a
                      href=""
                      class="secondary-content"
                      onClick={() => handleDelete(notas._id)}
                    >
                      <i class="material-icons icon-color">delete_sweep</i>
                    </a>
                  </div>
                </Card.Header>
                <Card.Body className="one">
                  <Card.Title>{notas.titulo}</Card.Title>
                  <Card.Text>{notas.descripcion}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
      {/* Quitar saltos de linea cuando se repare footer */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="addbtn">
        <Fab
          aria-label="add"
          onClick={() => {
            MySwal.fire(<CreateNote />).then(() => setLoading(loading + 1));
          }}
        >
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}

export default NotesView;
