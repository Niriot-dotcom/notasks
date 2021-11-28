import React, { useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import { ObjectId } from "bson";
import "./styles.css";
import Card from "react-bootstrap/Card";

function Progreso(props) {
  const [color, setColor] = useState("#FFFFFF");
  console.log("rendering progreso component");

  //Porgreso por día dependiendo del número de Notas
  const valores = [];
  const progreso_dia = new Map(); //Guardar todas las notas en un map
  const notas = new Map([]);
  props.Fechas.map((Notas) => {
    var dateN = new Date(ObjectId(Notas._id).getTimestamp());
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

  var w = window.innerWidth;
  return (
    <div>
      <div className="heatmap">
        <HeatMap
          value={valores}
          rectSize={20}
          width={1200}
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
          {notas.get(selected) &&
            notas.get(selected).map((Notas_Dia, index) => {
              return (
                <div className="container col">
                  <Card key={index}>
                    <Card.Header>
                      <Card.Title>{Notas_Dia.titulo}</Card.Title>
                    </Card.Header>
                    <Card.Body className="one">
                      <Card.Text>{Notas_Dia.descripcion}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </div>
      ) : (
        <h1>Selecciona una casilla para ver tu progreso de ese día</h1>
      )}

      <div id="picker"></div>
    </div>
  );
}

export default Progreso;
