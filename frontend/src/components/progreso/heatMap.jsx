import React, { useState, useLayoutEffect } from "react";
import HeatMap from "@uiw/react-heat-map";
import { ObjectId } from "bson";
import "./styles.css";
import Card from "react-bootstrap/Card";



function Progreso(props) {
  const [range, setRange] = useState("#fff");
  console.log("rendering progreso component");

  //Porgreso por día dependiendo del número de Notas
  const valores = [];
  const progreso_dia = new Map(); //Guardar todas las notas en un map
  const notas = new Map([]);
  props.Fechas.map((Notas) => {
    var dateN = new Date(Notas.fecha_fin);
    var fecha =
      dateN.getFullYear() +
      "/" +
      (dateN.getMonth() + 1) +
      "/" +
      dateN.getDate();
    if (progreso_dia.has(fecha)) {
      var numero_notas = progreso_dia.get(fecha) + 1;
      progreso_dia.set(fecha, numero_notas);

      let notas_por_dia = [];
      notas_por_dia = notas.get(fecha);
      notas_por_dia.push(Notas);
      notas.set(fecha, notas_por_dia);
    } else {
      progreso_dia.set(fecha, 1);
      const notas_por_dia = [];
      notas_por_dia.push(Notas);
      notas.set(fecha, notas_por_dia);
    }
  });
  console.log("Progreso por dia", progreso_dia);
  console.log("Notas", notas.get("2021/10/29"));
  for (let [key, value] of progreso_dia) {
    valores.push({
      date: key,
      count: value,
    });
  }

  

  console.log("Progreso heatmap", valores);

  //Fecha del Progreso por año
  var today = new Date();
  console.log("hoy",today);

  if(valores.length === 0){
    valores.push({
      date: "2000/1/1",
      count: 0,
    })
  }

  var dateActual = "";
  //dateActual+=(today.getFullYear())+'/'+(today.getMonth()+1)+'/'+(today.getDate()+1);
  dateActual += today.getFullYear() + "/" + 12 + "/" + 31;
  console.log("Fecha fin", dateActual);

  var dateInicio = "";
  if (today.getMonth() + 1 - 12 > 0) {
    dateInicio +=
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1 - 12) +
      "/" +
      today.getDate();
  } else {
    var dif = 12 - (today.getMonth() + 1);
    dateInicio += today.getFullYear() + "/" + 1 + "/" + 1;
  }

  console.log("Fecha inicio", dateInicio);
  const [selected, setSelected] = useState("");

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }
  
  const [width, height] = useWindowSize();

  return (
    <div>
      {/*<span>Window size: {((width*70)/100)} x {height} {((width*70)/100)/100 +10}</span>*/ }
      

      <div className="heatmap" style={{"backgroundColor": props.colorfondo}}>
        <HeatMap
          value={valores}
          rectSize={20}
          legendCellSize = {20}
          width={1200}
          height={250}
          style={{ color: props.color }}
          startDate={new Date(dateInicio)}
          weekLabels={["D", "L", "M", "M", "J", "V", "S"]}
          rectProps={{ rx: 5 }}
          endDate={new Date(dateActual)}
          monthLabels={[
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "Mayo",
            "Jun",
            "Jul",
            "Ago",
            "Sept",
            "Oct",
            "Nov",
            "Dic",
          ]}
          rectRender={(props, data) => {
            if (selected !== "") {
              props.opacity = data.date === selected ? 1 : 0.4;
            }
            return (
              <rect
                {...props}
                onClick={() => {
                  setSelected(data.date === selected ? "" : data.date);
                }}
              />
            );
          }}

          legendRender={(props) => <rect {...props} y={props.y + 10} rx={props.range} />}
          rectProps={{
            rx: props.range
          }}
        
        className="mapadecolor"
        
        />
      </div>

      {selected != "" ? (
        <div>
          <h1>Tareas completadas </h1>
          <p className="info">Fecha: {selected}</p>
          <p className="info">
            {" "}
            Total completado:{" "}
            {notas.has(selected) ? notas.get(selected).length : 0}
          </p>
          <div className="row">
            {notas.get(selected) &&
              notas.get(selected).map((Notas_Dia, index) => {
                return (
                  
                    <div className="col-md-4 animate__animated animate__fadeInUp nota" key={index}>
                      <Card className="card">
                              <div className="overflow-auto">
                                <Card.Body >
                                  <Card.Title>{Notas_Dia.titulo}</Card.Title>                
                                  <Card.Text>
                                      {Notas_Dia.descripcion}
                                  </Card.Text>
                                </Card.Body>
                                </div>
                        </Card>
                    </div>
                );
              })}
            </div>
        </div>
      ) : (
        <h2>Selecciona una casilla para ver tu progreso de ese día</h2>
      )}

      <div id="picker"></div>
    </div>
  );
}

export default Progreso;
