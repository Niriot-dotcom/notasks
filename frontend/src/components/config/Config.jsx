import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Redirect } from 'react-router-dom'
import './styles.css'; 
import { LoginContext } from "../../App";


function Configuracion() {
    LoginContext
    const {login, setLogin} = useContext(LoginContext);
    setLogin(true);

    const id = localStorage.getItem("id");
    const [borrar,setBorrar] = useState(false);

    const [loading, setLoading] = useState(true);
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [universidad, setUniversidad] = useState("");
    const [usuario, setUsuario] = useState("");

    useEffect(() => {
        axios({
            url: 'http://localhost:8080/api/usuario/'+id.toString(),
            method: 'GET',
        })
        .then((response) => {
            if(loading){
                console.log("Data has been sent to the server!", response.data);
                setLoading(false);
                console.log(response.data[0].mail);
                setContrasena(response.data[0].password);
                setUniversidad(response.data[0].university);
                setUsuario(response.data[0].user);
                setCorreo(response.data[0].mail);
            }
           
        })
        .catch((error) => {
            console.log("Internal server error: ", error);
        })
    });

    

    const handleEmailChange = (e) => {
        console.log(e.target.value);
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
            url: 'http://localhost:8080/api/actualizar/'+id.toString(),
            method: 'POST',
            data: datos
        })
        .then(() => {
            console.log("Data has been sent to the server!");
            alert("Tus datos han sido actualizados!");
        })
        .catch((error) => {
            console.log("Internal server error: ", error)
        })
    }

    const eliminar = (e)=>{
        axios({
            url: 'http://localhost:8080/api/eliminarcuenta/'+id.toString(),
            method: 'DELETE'
        })
        .then(() => {
            console.log("Eliminado!")
            setBorrar(true);
            
        })
        .catch((error) => {
            console.log("Internal server error: ", error)
        })
    }

    if(borrar){
        return <Redirect to = {{ pathname: "/Salir" }} />;
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

            <div className="eliminar container">
                    <span className="input-group-text" id="inputGroup-sizing-3">Eliminar cuenta</span>
                    <button className="btn btn-danger" onClick={eliminar} >Eliminar</button>
            </div>
        </div>
    );
}

export default Configuracion;
