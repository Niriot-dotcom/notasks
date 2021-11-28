import axios from "axios";
import React, { useState } from "react";
import { Redirect } from 'react-router-dom'
import './styles.css'; 
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)



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
            console.log("Data from server:", response)
            if (response.status === 200) {
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("isLogged", response.data.isLogged);
                setLogged(true);
            } else {
                MySwal.fire({
                    title: "No existe el usuario.",
                    icon: "error",
                    text: 'Revisa tu usuario o contraseña',
                    confirmButtonText: 'Intenta de nuevo',
            })
            }
        })
        .catch((error) => {
            console.log("Internal server error: ", error)
        })
        .finally(() => console.log("termine"));
    }

    if (isLogged) {
        localStorage.setItem("isLogged", true)
        return <Redirect to = {{ pathname: "/notes" }} />;
    } else {
        localStorage.setItem("isLogged", false)
        return (
            <div>
                <div className="inicio">
                <h1>Inicio de Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <div class="form-outline mb-4">
                        <input id="form1Example1" class="form-control" 
                         placeholder="Nombre de Usuario"
                         value={user}
                         type="text"
                         onChange={handleUserChange}
                        />
                        <label class="form-label" for="form1Example1">Nombre de Usuario</label>
                    </div>

                    <div class="form-outline mb-4">
                        <input type="password" id="form1Example2" class="form-control"
                         placeholder="Contraseña"
                         value={password}
                         onChange={handlePasswordChange}
                        />
                        <label class="form-label" for="form1Example2">Contraseña</label>
                </div>

                <div class="row mb-4">
                    <div class="col d-flex justify-content-center">
                    <div class="form-check">
                        <input
                        class="form-check-input"
                        type="checkbox"
                        id="form1Example3"
                        />
                        <label class="form-check-label" for="form1Example3"> Remember me </label>
                    </div>
                    </div>

                    <div class="col">
                    <a href="#!">Forgot password?</a>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary btn-block">iniciar sesión</button>
                </form>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
        );
    }
}

export default Login;
