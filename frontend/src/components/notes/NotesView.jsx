import React, { useState, useEffect } from "react";
import NoteCard from "./NoteCard";
import CreateNote from "./CreateNote";
import axios from "axios";

function NotesView() {
    const [notes, setNotes] = useState([]);
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
    }, [notes]);

    return (
        <div className="container">
            <h1>Notes page</h1>
            <CreateNote />
            {loading
                ? <h1>Loading...</h1>
                : notes.map((note, index) => {
                    return <NoteCard 
                                key={index}
                                titulo={note.titulo}
                                descripcion={note.descripcion}
                                id={note}
                    />
                })
            }
        </div>
    );
}

export default NotesView;
