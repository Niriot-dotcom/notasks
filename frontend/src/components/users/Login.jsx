import axios from "axios";
import React, { useState } from "react";
import { Redirect } from 'react-router-dom'

function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [isLogged, setLogged] = useState(false);

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
        .then((response) => {
            console.log("You are logged now!", response)
            if (response.status === 200) {
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("isLogged", response.data.isLogged);
                setLogged(true);
            } else {
                alert("No existe el usuario.")
            }
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

    if (isLogged) {
        return <Redirect to = {{ pathname: "/notes" }} />;
    } else {
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
                    <button>Iniciar sesión</button>
                </form>
            </div>
        );
    }
}

export default Login;
