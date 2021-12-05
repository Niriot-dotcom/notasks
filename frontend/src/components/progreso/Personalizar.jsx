import React, { useState, useEffect } from "react";
import axios from "axios";
import {SketchPicker, BlockPicker} from 'react-color';

function Personalizar() {
  const [color, setColor] = useState("#00000");
  const [colorfondo, setColorFondo] = useState("#fff");
  const [range, setRange] = useState(2);

  const handleChangeColor = (color) => {
    setColor(color.hex);
  };

  const handleChangeFondo = (colorf) => {
    setColorFondo(colorf.hex);
  };


  const guardar = (e) => {
        const id = localStorage.getItem("id");
        const datos = {
            color_fondo: colorfondo,
            color_leyenda: color,
            rect: range,
            id_usuario: id,
        };
        axios({
            url: 'http://localhost:8080/api/notes/personalizar/update/'+id, 
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

  return (
    <div>
      <h3 >Personalizar Heatmap</h3>

      <h3>Color de la leyenda</h3>
      <SketchPicker  
        color={ color }
        onChange={ handleChangeColor }
      />;

       <h3>Circulo</h3>
       <input type="range" min="0" max="10" step="0.1" value={range} onChange={(e) => setRange(e.target.value)} />

      <h3>Color de Fondo</h3>
      <BlockPicker 
        color ={ colorfondo }
        onChange={ handleChangeFondo }
      />

      <button class="btn btn-outline-primary" onClick={guardar}>Guardar</button>    

    </div>
  );
}

export default Personalizar;



