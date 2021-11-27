import axios from "axios";
import React from "react";
import './styles.css'; 

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
        <div class="container">
            <div>
                <div class="card-body">
                    <h5 class="card-title">{props.titulo}</h5>
                    <p class="card-text">{props.descripcion}</p>
                    {/*<button onClick={()=>handleDelete(props.id)}>Eliminar</button>*/}
                    {/*console.log("id de la nota",props.id)*/}
                </div>
            </div>
        </div>
    );
}

export default NoteCard;
