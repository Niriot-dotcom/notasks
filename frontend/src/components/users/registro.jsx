import axios from "axios";
import React, { useState } from "react";
import './styles.css'; 
import { Redirect }  from 'react-router-dom';

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
        .then(() => {
            console.log("You are registered now!")
            setLogged(true);
        })
        .catch((error) => {
            console.log("Internal server error: ", error)
        })
        .finally(() => console.log("termine"));
    }

    if (isLogged) {
        return <Redirect to = {{ pathname: "/notes" }} />;
    } else {
    return (
        <div className="estetica1">
            
            <div className="inicio2">
                <h1 className="h11">Registro</h1>
                <form onSubmit={handleSubmit}>
                    <div class="row mb-4">
                        <div class="col">
                        <div class="form-outline">
                            <input type="text" id="form3Example1" class="form-control" 
                             placeholder=""
                             value={user}
                             onChange={handleUserChange}
                            />
                            <label class="form-label" for="form3Example1" className="h11">Nombre de Usuario</label>
                        </div>
                        </div>
                        <div class="col">
                        <div class="form-outline">
                            <input type="text" id="form3Example2" class="form-control" 
                             placeholder=""
                             value={university}
                             onChange={handleUniversityChange}
                             />
                            <label class="form-label" for="form3Example2" className="h22">Universidad</label>
                        </div>
                        </div>
                    </div>

                    <div class="form-outline mb-4">
                        <input type="email" id="form3Example3" class="form-control" 
                        placeholder=""
                        value={mail}
                        onChange={handleMailChange}
                        />
                        <label class="form-label" for="form3Example3" className="h22">Correo</label>
                    </div>

                    <div class="form-outline mb-4">
                        <input type="password" id="form3Example4" class="form-control"
                         placeholder=""
                         value={password}
                         onChange={handlePasswordChange}
                        />
                        <label class="form-label" for="form3Example4" className="h22">Contraseña</label>
                    </div>

                    <div class="form-check d-flex justify-content-flex-center mb-4">
                        <input
                            class="form-check-input me-2"
                            type="checkbox"
                            id="form2Example33"
                        />
                        <label class="form-check-label" className="h22">
                            Recibir notificaciones
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block mb-4" className="h22">Registrar</button>
            </form>
            </div>
        </div>
    );
    }
}

export default CreateUser;
