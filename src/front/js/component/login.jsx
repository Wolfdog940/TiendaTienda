import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [valores, setValores] = useState({});
  const segurity = useNavigate();
  const handleInputChange = (event) => {
    setValores({
      ...valores,
      [event.target.type]: event.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    actions.login(valores);
    setTimeout(() => {
      if (store.token != null) {
        segurity("/home");
      } else {
        segurity("/singup");
        alert("deves estar registrado para continuar");
      }
    }, 500);
  }

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Correo electrónico
          </label>
          <input
            value={valores.email}
            onChange={handleInputChange}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
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
            value={valores.password}
            onChange={handleInputChange}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Logeate
        </button>

        <Link to="/singup">si no estas registrado pincha aqui</Link>
      </form>
    </div>
  );
};

export default Login;
