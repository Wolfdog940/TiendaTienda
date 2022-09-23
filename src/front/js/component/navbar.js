import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [carro, setCarro] = useState([]);

  return (
    <nav className="navbar navbar-light bg-light">
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          carrito
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1"></ul>
      </div>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          favoritos
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1"></ul>
      </div>
    </nav>
  );
};
