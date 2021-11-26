import React, { useState, useEffect, useContext} from "react";
import NoteCard from "./NoteCard";
import CreateNote from "./CreateNote";
import Progreso from "../Progreso/HeatMap";
import axios from "axios";
import { ObjectId } from "bson";
import './styles.css'; 
import { LoginContext } from "../../App";

function NotesView() { 
    const {login, setLogin} = useContext(LoginContext);
    setLogin(true);

    const [notes, setNotes] = useState([{
        _id: ObjectId(),                                                       
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
                console.log("DATOS", notes);
            }   
        })
        .catch((error) => {
            console.log("Internal server error: ", error);
        })
    });



    const ProgresoNotas = [];
    notes.map((notas, index)=>{
        ProgresoNotas.push(notas._id);
    })

    return (<div className="container">
            <h1>Notas de la semana</h1>
            <div className="row container-flow caja">
                {   
                    notes.map((notas, index)=>{
                        return <div className="container col"> <NoteCard 
                        key={index}
                        titulo={notas.titulo}
                        descripcion={notas.descripcion}
                        idNota={notas._id}/>
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
