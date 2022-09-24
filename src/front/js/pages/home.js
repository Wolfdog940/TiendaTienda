import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getListProducts();
  }, []);

  return (
    <div className="text-center mt-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">descripcion </th>
            <th scope="col">categoria</th>
            <th scope="col">price</th>
            <th scope="col">stock</th>
          </tr>
        </thead>
        <tbody>
          {store.listaProductos && store.listaProductos.length > 0
            ? store.listaProductos[0].map((producto, i) => {
                return (
                  <tr key={i}>
                    <td>{producto.name}</td>
                    <td>{producto.description}</td>
                    <td>{producto.category}</td>
                    <td>{producto.price}</td>
                    <td>{producto.stock}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};
