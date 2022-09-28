import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = (props) => {
  const { store, actions } = useContext(Context);
  const { index } = props;

  useEffect(() => {
    actions.getListProducts();
    console.log(store.listaProductos);
  }, []);

  return (
    <div className="container">
      <h1>{store.carro.length}</h1>
      <h1>Productos</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Añadir a favoritos</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Añadir a cesta</th>
          </tr>
        </thead>
        <tbody>
          {store.listaProductos && store.listaProductos.length > 0
            ? store.listaProductos[0].map((product, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <button className="btn btn-warning">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-star"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </button>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.category}</td>
                    <td>{product.price + " " + "€"}</td>
                    <td>{product.stock + " " + "/u"}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          actions.postCarro(product.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-bag-check"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                          />
                          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })
            : console.log("no se")}
        </tbody>
      </table>
      <h1>Cesta</h1>
      <ul
        className="dropdown-menu bg-warning "
        aria-labelledby="dropdownMenuButton1"
      >
        {store.carro.map((item, i) => (
          <li className="d-flex" key={i}>
            <a className="dropdown-item d-inline" href="#">
              {item}
            </a>
            <i
              className="fas fa-trash-alt m-0"
              onClick={() => {
                actions.deleteFavorites(i);
              }}
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
};
