import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import CreateNote from "./CreateNote";
import axios from "axios";
import { ObjectId } from "bson";
import './styles.css'; 

function NotesView() {
    const [notes, setNotes] = useState([{
        id: ObjectId(),
        titulo: '',
        descripcion: ''
    }]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios({
            url: 'http://localhost:8080/api/notes',
            method: 'GET',
        })
        .then((response) => {
            if (loading) {
                console.log("Data has been sent to the server!", response.data);
                setNotes(response.data);
                setLoading(false);
            }   
        })
        .catch((error) => {
            console.log("Internal server error: ", error);
        })
    });

    return (<div className="container">

            <h1>Notas de la semana</h1>
            <div className="row container-flow caja">
            {   
                notes.map((notas, index)=>{
                    return <div className="container col"> <NoteCard 
                    key={index}
                    titulo={notas.titulo}
                    descripcion={notas.descripcion}
                    id={notas.id}/>
                    </div>
                })
            }
            
            <div className="crear">
            <h1>Crear una nota</h1>
            <CreateNote/>
            </div>

            </div>
        </div>);

}

export default NotesView;
