import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { UserList } from "../user/UserList";

export const Following = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuth();
  const params = useParams();

  useEffect(() => {
    getUsers(1);
  }, []);

  // Actualizar en tiempo real los seguidores.
  useEffect(() => {
    authUser();
  }, [following]);

  const getUsers = async (nextPage = 1) => {
    // Efecto de carga.
    setLoading(true);

    // Sacar userId de la url.
    const userId = params.userId;

    // Hacer peticion para sacar usuarios.
    const request = await fetch(
      Global.url + "follow/following/" + userId + "/" + nextPage,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    const data = await request.json();
    console.log(data.follows);
    // Crear un estado para poder listarlos.
    if (data.follows && data.status === "success") {
      let newUsers = data.follows;

      if (users.length >= 1) {
        newUsers = [...users, ...data.follows];
      }
      setUsers(newUsers);
      setFollowing(data.user_following);
      setLoading(false);

      // Paginacion.
      if (users.length >= data.total - data.follows.length) {
        setMore(false);
      }
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Usuarios que sigue "Nombre"</h1>
      </header>

      <UserList
        users={users}
        getUsers={getUsers}
        following={following}
        setFollowing={setFollowing}
        page={page}
        setPage={setPage}
        more={more}
        loading={loading}
      />
    </>
  );
};
