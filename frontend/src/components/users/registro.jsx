import axios from "axios";
import React, { useState } from "react";

function CreateUser() {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [university, setUniversity] = useState("");

    const handleMailChange = (e) => {
        setMail(e.target.value);
        console.log(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        console.log(e.target.value);

    }
    
    const handleUniversityChange = (e) => {
        setUniversity(e.target.value);
        console.log(e.target.value);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("You clicked")

        const payload = {
            mail: mail,
            password: password,
            university: university
        };

        axios({
            url: 'http://localhost:8080/api/user/register',
            method: 'POST',
            data: payload
        })
        .then(() => {
            console.log("You are registered now!")
        })
        .catch((error) => {
            console.log("Internal server error: ", error)
        })
        .finally(() => console.log("termine"));

        // axios({
        //     url: 'http://localhost:8080/api/notes',
        //     method: 'GET',
        // })
        // .then((response) => {
        //     console.log("Data has been sent to the server!", response.data)
        // })
        // .catch((error) => {
        //     console.log("Internal server error: ", error)
        // })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-input">
                    <input
                        placeholder="Tu correo"
                        value={mail}
                        type="text"
                        onChange={handleMailChange}
                    />
                </div>
                <div className="form-input">
                    <input
                        placeholder="Contraseña"
                        value={password}
                        type="text"
                        onChange={handlePasswordChange}
                        //cols="15"
                    />
                </div>
                <div className="form-input">
                    <input
                        placeholder="Universidad"
                        value={university}
                        type="text"
                        onChange={handleUniversityChange}
                        //cols="15"
                    />
                </div>


                <button>Create user</button>
            </form>
        </div>
    );
}

export default CreateUser;
