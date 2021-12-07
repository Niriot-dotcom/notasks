import React, { useState, useEffect, useContext } from "react";
import CreateNote from "./CreateNote";
import { ObjectId } from "bson";
import axios from "axios";
import "./styles.css";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Card, footer} from 'react-bootstrap';
import AuthContext from "../../AuthContext.js"


import img1 from './assets/img.JPG'

const MySwal = withReactContent(Swal);

function NotesView() {
  const [loggedIn, setLoggedIn] = useContext(AuthContext);
  setLoggedIn(true);
  console.log("desde notas", loggedIn);

  const [notes, setNotes] = useState([
    {
      id: ObjectId(),
      titulo: "",
      descripcion: "",
      estatus: Boolean,
      id_usuario:ObjectId()
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [numeronotas, setNumeroNotas] = useState(0);
  
  useEffect(() => {
    const id = localStorage.getItem("id");
    axios({
      url: "http://localhost:8080/api/notes/unfinished/" + id,
      method: "GET",
    })
    .then((response) => {
      if(loading){
        console.log("Data has been sent to the server!", response.data);
        setNotes(response.data);
        setNumeroNotas(response.data.length);
        setLoading(false);
      }
    })
    .catch((error) => {
      console.log("Internal server error: ", error);
    });
  }, [loading]);


  const handleDelete = (idNote) => {
    console.log(idNote)
    axios({
      url: "http://localhost:8080/api/notes/delete/" + idNote,
      method: "DELETE"
    })
    .then((response) => {
      console.log("Nota eliminada!", response.data);
        setLoading(true);
    })
    .catch((error) => {
      console.log("No se pudo eliminar la nota ", error);
    })
  };

  const handleCkeck = (idNote) =>{
    axios({
      url: "http://localhost:8080/api/notes/check/" + idNote,
      method: "POST",
    })
    .then((response) => {
      console.log("Datos actualizados!", response.data);
      setLoading(true);
    })
    .catch((error) => {
      console.log("Error al actualizar nota: ", error);
    })
  };

  return (
    <div className= "main">
      <h1 className="titulo">Notas</h1>

      <div className="container notes">
        <div className="row">
          {notes.length && !loading ? (
            notes.map((notas, index) => {
            return (
              <div className="col-md-4 animate__animated animate__fadeInUp nota" key={index}>
                      {console.log(notes.length)}
                      <Card className="card">
                          <div className="overflow-auto">
                            <Card.Body >
                              <Card.Title>{notas.titulo}</Card.Title>                
                              <Card.Text>
                                  {notas.descripcion}
                              </Card.Text>
                            </Card.Body>
                            </div>
                            
                            <footer className="bg-white">
                                <div align="right">
                                      <a
                                        href="javascript:void(0);"
                                        className="secondary-content"
                                        onClick={() => handleDelete(notas._id)}
                                      >
                                      <i className="material-icons icon-color">delete_sweep</i>
                                      </a>
                                      <a
                                        href="javascript:void(0);"
                                        className="secondary-content"
                                        onClick={() => handleCkeck(notas._id)}
                                      >
                                      <i className="material-icons icon-color">check</i>
                                      </a>
                                </div>
                            </footer>
                    </Card>
               
              </div>
            );
          })
          ): !loading ?  <div className="valores"><h1>¡Crea una nota!</h1> <p>Para crear una nota, es necesario dar click en el     <Fab aria-label="add" size="small"  > <AddIcon/> </Fab> flotante</p> <h3>Simbología</h3> <p><i className="material-icons icon-color">check</i> Al dar click la tarea será finalizada, posterior a esto se mostrará en el heatmap</p> <p><i className="material-icons icon-color">delete_sweep</i> Elimina una nota de forma permanente</p></div> : (
          <div className="spinner-border text-primary cargando" role="status">
            <span className="sr-only"></span>
          </div>
          )
        }
        </div>
      </div>

      <div className="addbtn">
          <Fab
            color="secondary"
            aria-label="add"
            onClick={() => {
              MySwal.fire(<CreateNote />).then(() =>  setLoading(true));
            }}
          >
          <AddIcon/>
        </Fab>
      </div>
    </div>
  );
}

export default NotesView;
