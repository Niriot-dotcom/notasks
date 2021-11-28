import axios from "axios";
import React, { useState } from "react";

function CreateNote() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleBodyChange = (e) => {
        setBody(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            title: title,
            body: body
        };

        axios({
            url: 'http://localhost:8080/api/notes/create',
            method: 'POST',
            data: payload
        })
        .then(() => {
            console.log("Data has been sent to the server!")
        })
        .catch((error) => {
            console.log("Internal server error: ", error)
        })
        setTitle("");
        setBody("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Crea una nueva nota</h1>
                <br></br>
                <div className="form-input">
                    <input
                        placeholder="Título"
                        value={title}
                        type="text"
                        onChange={handleTitleChange}
                    />
                </div>
                <br />

                <div className="form-input">
                    <textarea
                        placeholder="Descripción"
                        value={body}
                        type="text"
                        onChange={handleBodyChange}
                        cols="22"
                        rows="5"
                    />
                </div>
                <button class="btn btn-outline-primary" >Crear nota</button>
            </form>
        </div>
    );
}

export default CreateNote;
