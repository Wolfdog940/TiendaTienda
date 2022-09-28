import React from "react";
import { Link } from "react-router-dom";

const SingUp = () => {
  return (
    <div>
      <h1>Sing up</h1>{" "}
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Correo electrónico</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Contraseña"
        />
        <label htmlFor="floatingPassword">Contraseña</label>
      </div>
      <Link to="/">
        <button type="submit" className="btn btn-primary">
          Registrate
        </button>
      </Link>
      <Link to="/">si ya estas registrado pincha aqui</Link>
    </div>
  );
};

export default SingUp;
