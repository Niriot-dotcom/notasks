import axios from "axios";
import React, { useState } from "react";
import './styles.css'; 

function Configuracion() {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [universidad, setUniversidad] = useState("");
    const [usuario, setUsuario] = useState("");

    const handleEmailChange = (e) => {
        setCorreo(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setContrasena(e.target.value);
    }

    const handleUniChange = (e) => {
        setUniversidad(e.target.value);
    }

    const handleUserChange = (e) => {
        setUsuario(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const datos = {
            correo: correo,
            contrasena: contrasena,
            universidad:universidad,
            usuario: usuario
        };

        axios({
            url: 'http://localhost:8080/api/actualizar',
            method: 'POST',
            data: datos
        })
        .then(() => {
            console.log("Data has been sent to the server!")
        })
        .catch((error) => {
            console.log("Internal server error: ", error)
        })
    }

    const eliminar = (e)=>{
        axios({
            url: 'http://localhost:8080/api/eliminarcuenta',
            method: 'DELETE'
        })
        .then(() => {
            console.log("Eliminado!")
        })
        .catch((error) => {
            console.log("Internal server error: ", error)
        })
    }

    return (
        
        <div >
            <div className="formulario container">
                    <div className="row titulo"> <h1>Configuracion de cuenta</h1></div>


                    <form onSubmit={handleSubmit} >
                        <div className="input-group mb-3 ">
                            <span className="input-group-text" id="inputGroup-sizing-lg">Usuario</span>
                            <input 
                                type="text" 
                                className="form-control" 
                                aria-label="Sizing example input" 
                                aria-describedby="inputGroup-sizing-default" 
                                placeholder=""
                                value={usuario}
                                onChange={handleUserChange}
                            />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Correo</span>
                            <input 
                                type="text" 
                                className="form-control" 
                                aria-label="Sizing example input" 
                                aria-describedby="inputGroup-sizing-default" 
                                placeholder=""
                                value={correo}
                                onChange={handleEmailChange}
                            />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Contraseña</span>
                            <input 
                                type="text" 
                                className="form-control" 
                                aria-label="Sizing example input" 
                                aria-describedby="inputGroup-sizing-default" 
                                placeholder=""
                                value={contrasena}
                                onChange={handlePasswordChange}
                            />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-3">Universidad</span>
                            <input 
                                type="text" 
                                className="form-control" 
                                aria-label="Sizing example input" 
                                aria-describedby="inputGroup-sizing-default" 
                                placeholder=""
                                value={universidad}
                                onChange={handleUniChange}
                            />
                        </div>
                        <button className="btn btn-outline-success">Guardar</button>

                    </form>

            </div>

            <div class="eliminar container">
                    <span className="input-group-text" id="inputGroup-sizing-3">Eliminar cuenta</span>
                    <button className="btn btn-danger" onClick={eliminar}>Eliminar</button>
                </div>
        </div>
    );
}

export default Configuracion;
