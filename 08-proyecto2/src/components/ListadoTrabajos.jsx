import React from "react";
import { Link, LinkNav } from "react-router-dom";
import { trabajos } from "../data/trabajos";

export const ListadoTrabajos = ({ limite }) => {
  return (
    <section className="works">
      {trabajos.slice(0, limite).map((trabajo) => (
        <article className="work-item" key={trabajo.id}>
          <div className="mask">
            <img src={"/imgs/" + trabajo.id + ".png"} alt="" />
          </div>
          <span>{trabajo.categorias}</span>
          <h2>
            <Link to={"/proyecto/" + trabajo.id}>{trabajo.nombre}</Link>
          </h2>
          <h3>{trabajo.tecnologias}</h3>

          {trabajo.url}
        </article>
      ))}
    </section>
  );
};
