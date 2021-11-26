import React , {useState, useEffect} from "react";
import axios from "axios";
import { LoginContext } from "../../App";
import Progreso from "../Progreso/HeatMap";
import './styles.css'; 


function Perfil() {
    const [notes, setNotes] = useState(null);
    const [loading, setLoading] = useState(true);
    const ProgresoNotas = [];

    useEffect(() => {
        const id = localStorage.getItem("id");
        axios({
            url: 'http://localhost:8080/api/notes/'+id,
            method: 'GET',
        })
        .then((response) => {
            if (loading) {
                setNotes(response.data);
                setLoading(false);
            }
        })
        .catch((error) => {
            console.log("Internal server error: ", error);
        })
    }, [])

    return (
        <div>
            <h1 className="titulo">Progreso</h1>
            <div className="progreso">
            {
                 !loading && <Progreso Fechas = {notes}/> 
            }
            </div>
            <h1></h1>
        </div>
    );
}

export default Perfil;
