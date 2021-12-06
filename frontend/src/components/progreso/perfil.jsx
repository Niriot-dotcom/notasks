import React, { useState, useEffect } from "react";
import axios from "axios";
import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "./styles.css";
import Progreso from "./heatMap";
import Personalizar from "./Personalizar";
import Configuracion from "../config/Config"
import Logout from "../users/Logout";

function Perfil() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#00000");
  const [colorfondo, setColorFondo] = useState("#fff");
  const [range, setRange] = useState(2);
  const MySwal = withReactContent(Swal);


  const personalizar = (id) =>{
    axios({
      url: "http://localhost:8080/api/personalizar/"+id,
      method: "GET",
    })
    .then((response) => {
      if (loading) {
        
        setColor(response.data.color_leyenda);
        setColorFondo(response.data.color_fondo);
        setRange(response.data.rect);
        
        setLoading(false);
        console.log("Personalizar",response.data);
      }
    })
    .catch((error) => {
      console.log("Internal server error: ", error);
    })

  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    axios({
      url: "http://localhost:8080/api/notes/" + id,
      method: "GET",
    })
    .then((response) => {
      if (loading) {
        setNotes(response.data);
        console.log("Notas",response.data);
      }
    })
    .catch((error) => {
      console.log("Internal server error: ", error);
    });

    personalizar(id);
    
  }, [loading]);


  return (
    <div className="main">
      <h1 className="titulo">Cerrar sesión</h1>
      <div>
          <Logout/>
        </div>


      <h1 className="titulo">Progreso</h1>

      {!loading ? (
        <div className="progreso">
          <Progreso Fechas={notes} color = {color} colorfondo ={colorfondo} range = {range}/>{" "}
        </div>
      ) : (
        <h1>esperando...</h1>
      )}

          <div className="editbtn">
            <Fab
                color="secondary"
                aria-label="edit"
                onClick={() => {
                  MySwal.fire(<Personalizar />).then(() =>  setLoading(true));
                }}
              >
              <EditIcon/>
            </Fab>
          </div>

        <div className="configuracion">
          <Configuracion/>
        </div>
      
    </div>
  );
}

export default Perfil;
