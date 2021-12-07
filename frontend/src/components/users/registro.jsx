import axios from "axios";
import React, { useState } from "react";
import './styles.css'; 
import { Redirect }  from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

function CreateUser() {
    const [mail, setMail] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [university, setUniversity] = useState("");

    const [isLogged, setLogged] = useState(false);

    const handleUserChange = (e) => {
        setUser(e.target.value);
        console.log(e.target.value);
    }

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
            user: user,
            mail: mail,
            password: password,
            university: university,
        };

        axios({
            url: 'http://localhost:8080/api/user/register',
            method: 'POST',
            data: payload
        })
        .then((response) => {
            console.log("Data from server:", response)
            var textAlert = "";
            if (response.status === 200){
                localStorage.setItem("id", response.data.id);
                setLogged(true);
            }
            if(response.status === 201) 
                textAlert = "Ese usuario ya existe.";
            if(response.status === 202)
                textAlert = "Ese correo ya ha sido utilizado.";
            if(response.status === 203){
                textAlert = 
                `
                    <h3>Contraseña invalida.</h3>
                    <center>
                    <div align = "start" style = "width: 18vw"> 
                        Debe contener:
                        <ul>
                            <li>Numeros</li>
                            <li>Minúsculas</li>
                            <li>Mayúsculas</li>
                            <li>Longitud mínima de 8</li>
                            <li>Caracteres especiales</li>
                        </ul>
                    </div>
                    </center>
                `;
            }
            if(response.status !== 200) {
                MySwal.fire({
                    title: "Error al registrarse.",
                    icon: "error",
                    html: textAlert,
                    confirmButtonText: 'Intenta de nuevo',
            })
            }

        })
        .catch((error) => {
            console.log("Internal server error: ", error)
        })
        .finally(() => console.log("termine"));
    }


    const Crear = (e)=>{
        const id_usuario = localStorage.getItem("id");
        console.log(id_usuario)
        const datos = {
            color_fondo: "#FFFFFF",
            color_leyenda: "#000000",
            rect: 2,
            id_usuario: id_usuario,
        };
        axios({
            url: 'http://localhost:8080/api/notes/personalizar/'+id_usuario,
            method: 'POST',
            data: datos
        })
        .then(() => {
            console.log("Data has been sent to the server!")
        })
        .catch((error) => {
            console.log("Internal server error: ", error)
        })
    };

    if (isLogged) {
        Crear();
        return <Redirect to = {{ pathname: "/notes" }} />;
    } else {
    return (
        <div>
            
            <div className="inicio">
                <h1>Registro</h1>
                <form onSubmit={handleSubmit}>
                    <br></br>
                    <div class="row mb-4">
                        <div class="col">
                        <div class="form-outline">
                            <input type="text" id="form3Example1" class="form-control" 
                             placeholder="Usuario"
                             value={user}
                             onChange={handleUserChange}
                            />
                            <label class="form-label" for="form3Example1">Nombre de Usuario</label>
                        </div>
                        </div>
                    </div>

                    <div class="form-outline mb-4">
                        <input type="email" id="form3Example3" class="form-control" 
                        placeholder="Correo"
                        value={mail}
                        onChange={handleMailChange}
                        />
                        <label class="form-label" for="form3Example3">Correo</label>
                    </div>

                    <div class="form-outline mb-4">
                        <input type="password" id="form3Example4" class="form-control"
                         placeholder="Contraseña"
                         value={password}
                         onChange={handlePasswordChange}
                        />
                        <label class="form-label" for="form3Example4">Contraseña</label>
                    </div>

                    {/* <div class="form-check d-flex justify-content-flex-center mb-4">
                        <input
                            class="form-check-input me-2"
                            type="checkbox"
                            id="form2Example33"
                        />
                        <label class="form-check-label">
                            Recibir notificaciones
                        </label>
                    </div> */}
                    <button type="submit" class="btn btn-outline-dark btn-block mb-4">Registrar</button>
            </form>
            </div>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
    }
}

export default CreateUser;
