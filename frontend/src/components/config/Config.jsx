import axios from "axios";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "./styles.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Configuracion() {
  const id = localStorage.getItem("id");
  const [borrar, setBorrar] = useState(false);

  const [loading, setLoading] = useState(true);
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [lastCont, setCont] = useState("");
  const [universidad, setUniversidad] = useState("");
  const [usuario, setUsuario] = useState("");

  useEffect(() => {
    axios({
      url: "http://localhost:8080/api/usuario/" + id.toString(),
      method: "GET",
    })
      .then((response) => {
        if (loading) {
          console.log("Data has been sent to the server!", response.data);
          setLoading(false);
          console.log(response.data[0].mail);
          setContrasena(response.data[0].password);
          setCont(response.data[0].password);
          setUniversidad(response.data[0].university);
          setUsuario(response.data[0].user);
          setCorreo(response.data[0].mail);
        }
      })
      .catch((error) => {
        console.log("Internal server error: ", error);
      });
  });

  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setCorreo(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setContrasena(e.target.value);
  };

  const handleUniChange = (e) => {
    setUniversidad(e.target.value);
  };

  const handleUserChange = (e) => {
    setUsuario(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const datos = {
      correo: correo,
      contrasena: contrasena,
      universidad: universidad,
      usuario: usuario,
    };
    if(contrasena == lastCont){
      MySwal.fire({
        text: "Se ha conservado la misma contraseña",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
    else{
      axios({
        url: "http://localhost:8080/api/actualizar/" + id.toString(),
        method: "POST",
        data: datos,
      })
        .then(response => {
          console.log("Data has been sent to the server!");
          if (response.status === 200){
            MySwal.fire({
              title: "Cambio exitoso",
              text: "La contraseña se ha actualizado",
              icon: "success",
              confirmButtonText: "Ok",
            });
            setCont(contrasena);
          }
          else{
            var textAlert = 
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
            MySwal.fire({
              title: "Verifica tu contraseña",
              icon: "error",
              html: textAlert,
              confirmButtonText: 'Intenta de nuevo',
            })
          }
        })
        .catch((error) => {
          console.log("Internal server error: ", error);
        });
    }
  };

  const eliminar = (e) => {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar la cuenta?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No, no me quiero ir'
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          url: "http://localhost:8080/api/eliminarcuenta/" + id.toString(),
          method: "DELETE",
        })
          .then(() => {
            console.log("Eliminado!");
            setBorrar(true);
          })
          .catch((error) => {
            console.log("Internal server error: ", error);
          });
      }
    })
  };

  if (borrar) {
    return <Redirect to={{ pathname: "/Salir" }} />;
  }

  return (
    <div>
      <div className="formulario container">
        <div className="row titulo">
          {" "}
          <h1>Cambiar contraseña</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3 ">
            <span className="input-group-text etiquetas">Usuario</span>
            <span className="form-control">{usuario}</span>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text etiquetas">Correo</span>
            <span className="form-control">{correo}</span>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text etiquetas">Contraseña</span>
            <input
              type="password"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder=""
              value={contrasena}
              onChange={handlePasswordChange}
            />
          </div>
          <button className="btn btn-outline-dark">Guardar</button>
        </form>
        <br></br>
        <br></br>
        <br></br>
        <div className="titulo">
          <h1>Eliminar Cuenta</h1>
        </div>
        <p>
          Si elimina la cuenta, perderá todo registro de las notas y tareas
          realizadas
        </p>
        <div className="mb-3">
          <span className="btn btn-danger" onClick={eliminar}>
            Eliminar
          </span>
        </div>
      </div>
    </div>
  );
}

export default Configuracion;
