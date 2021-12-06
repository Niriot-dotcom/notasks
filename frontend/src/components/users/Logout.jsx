import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function Logout() {
    return (
      <center>
        <p>¡Vuelve pronto!</p>
        <div className="mb-3">
          <span className="btn btn-danger" onClick={() => {
            localStorage.setItem("id", "");
            localStorage.setItem("isLogged", false);
            return <Redirect to={{ pathname: "/home" }} />;
            
          }}>
            Cierre de sesion
          </span>
        </div>
      </center>
    );
};

export default Logout;
