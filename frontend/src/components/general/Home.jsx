import React, { useEffect } from "react";
import './home.css';
import img from "./Ejemplo.png";

function Home() {

    return (
        <div>
            <div className="hola">
                <h1>HOLA!</h1>
            </div>
            <div className="description">
                <div className="one">
                    <h2>Página web dedicada a la creación de notas, a través de las cuales los usuarios (mayormente estudiantes), podrán crear eventos que incluirán tareas, exámenes, clases, asesorías, pendientes, etc. Además, tendrán la posibilidad de crear un calendario de pagos a partir de los datos ingresados por el usuario, con la finalidad de obtener el monto y la fecha de los ya mencionados.
                    </h2>
                </div>
                <div className="two">
                    <img src={require("./Ejemplo.png")}/>
                </div>
            </div>
            <div className="description2">
                <div className="two">
                <img src={require("./Ejemplo.png")}/>
                </div>
                <div className="one">
                    <h2>¿Qué podemos hacer por ti?</h2>
                    <h3>¡Juntamos todas las aplicaciones que usas en tu día a día en una sola, para que puedas llevar tu vida académica de manera más organizada!</h3>
                </div>
            </div>
            <div className="hola">
                <h1>Pronto podremos vincular todas tus aplicaciones...</h1>
            </div>
            <div className="BODY1">
            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel" >
                <div className="carousel-indicators" >
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                <div className="carousel-item active">
                    <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="black"/></svg>
            
                    <div className="container">
                    <div className="carousel-caption text-start">
                    <img src={require("./Ejemplo.png")}/>
                    </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="black"/></svg>
            
                    <div className="container">
                    <div className="carousel-caption">
                    <img src={require("./Ejemplo.png")}/>
                    </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="black"/></svg>
            
                    <div className="container">
                    <div className="carousel-caption text-end">
                    <img src={require("./Ejemplo.png")}/>
                    </div>
                    </div>
                </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
                </button>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
            </div>
        </div>
    );
}

export default Home;
