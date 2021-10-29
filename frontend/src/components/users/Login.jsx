import axios from "axios";
import React, { useState } from "react";

function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const handleUserChange = (e) => {
        setUser(e.target.value);
        console.log(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        console.log(e.target.value);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("You clicked")

        const payload = {
            user: user,
            password: password,
        };

        axios({
            url: 'http://localhost:8080/api/user/login',
            method: 'POST',
            data: payload
        })
        .then(() => {
            console.log("You are logged now!")
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
                        placeholder="Nombre de Usuario"
                        value={user}
                        type="text"
                        onChange={handleUserChange}
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
                <button>Create user</button>
            </form>
        </div>
    );
}

export default Login;