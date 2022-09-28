import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const SingUp = () => {
  const { store, actions } = useContext(Context);
  const [valores, setValores] = useState({});

  const handleInputChange = (event) => {
    setValores({
      ...valores,
      [event.target.type]: event.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(valores);
    actions.registro(valores);
  }

  return (
    <div className="d-flex justify-content-center">
      <p>Registro de Usuario</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Correo electrónico
          </label>
          <input
            onChange={handleInputChange}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="email"
          />
          <div id="emailHelp" className="form-text">
            Nunca compartiremos su correo electrónico con nadie más.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Contraseña
          </label>
          <input
            onChange={handleInputChange}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default SingUp;
