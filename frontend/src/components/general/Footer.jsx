import React, { useEffect } from "react";
import './footer.css'
// import {"https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css"};

function Footer() {
    return (
        <footer className="pie-pagina">
            <div className="one">
                <div className="box">
                    <h1>NOTASKs</h1>
                </div>
                <div className="box">
                    <h3>SOBRE NOSOTROS</h3>
                </div>
                <div className="box">
                    <h2>REDES SOCIALES</h2>
                    <div className="red-social">
                        <i className='bx bxl-facebook-circle'></i>
                        <i className='bx bxl-whatsapp-square' ></i>
                        <i className='bx bxl-instagram-alt'></i>
                    </div>
                </div>
            </div>
            <div className="two">
                <small>© 2021 - Todos los Derechos Reservados.</small>
            </div>
        </footer>
    );
}

export default Footer;