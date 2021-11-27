import axios from "axios";
import React from "react";
import "./styles.css";
import Card from "react-bootstrap/Card";

function NoteCard(props) {
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
      });
  };

  // console.log(props);
  return (
    <Card>
      <Card.Header>Borrar</Card.Header>
      <Card.Body className="one">
        <Card.Title>{props.titulo}</Card.Title>
        <Card.Text>{props.descripcion}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default NoteCard;
