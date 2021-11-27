import React, { useState, useEffect } from "react";
import CreateNote from "./CreateNote";
import NoteCard from "./NoteCard";
import { ObjectId } from "bson";
import axios from "axios";
import './styles.css'; 
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


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

    return (
        <div>
            <h1>Notas de la Semana</h1>
            <div>
                <div className="grid">
                {   
                    notes.map((notas, index)=>{
                        return(
                            <div>
                                <NoteCard 
                                    key={index}
                                    titulo={notas.titulo}
                                    descripcion={notas.descripcion}
                                    id={notas.id}
                                />      
                            </div>
                    )})
                }
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
            <Fab style = {{fill: "black"}} aria-label="add" onClick={() => {
                return MySwal.fire(<CreateNote />)
            }}>
                <AddIcon />
            </Fab>
            </div>
        </div>
    );
}

export default NotesView;
