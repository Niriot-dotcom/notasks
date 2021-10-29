import axios from "axios";
import React from "react";
import { Card } from "react-bootstrap"

function NoteCard(props) {

    const handleDelete = (idNote) => {
        axios({
            url: 'http://localhost:8080/api/notes/delete/' + idNote,
            method: 'DELETE',
        })
        .then((response) => {
            console.log("Data has been sent to the server!", response.data);
        })
        .catch((error) => {
            console.log("Internal server error: ", error);
        })
    }

    return (
        <Card style={{ width: '12rem' }}>
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZPMR6tjHCqvKDo9rU_1mIE50_AfVASIDvHg&usqp=CAU" />
            <Card.Body>
                <Card.Title>{props.titulo}</Card.Title>
                <Card.Text>{props.descripcion}</Card.Text>
                <button onClick={() => handleDelete(props.id._id)}>Eliminar</button>
                {/* <button onClick={() => console.log(props.id._id)}>Eliminar</button> */}
            </Card.Body>
        </Card>
    );
}

export default NoteCard;
