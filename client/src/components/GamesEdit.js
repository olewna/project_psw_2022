import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams, Link } from "react-router-dom";
import { useStore } from "../context/StoreProvider";
import axios from "axios";

export default function GamesEdit() {
  const { id } = useParams();
  const { logged, setGames, games, loading } = useStore();
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentGame, setCurrentGame] = useState(
    !loading && games.filter((g) => g.id === id)[0]
  );

  const handleSubmit = async (val) => {
    axios
      .patch(`/api/games/${id}`, val)
      .then((res) => {
        console.log("game patched");
        setErrorMsg("Updated!");
      })
      .catch((err) => setErrorMsg(err));
    await setGames((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          return val;
        } else return g;
      })
    );
  };

  useEffect(() => {
    setCurrentGame(!loading && games.filter((g) => g.id === id)[0]);
  }, [games, loading, id]);

  const formik = useFormik({
    initialValues: {
      name: !loading && currentGame.name,
      type: !loading && currentGame.type,
      price: !loading && currentGame.price,
      id: id,
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <div className="container">
      <div className="row">
        {logged.type === "admin" ? (
          <form className="form" onSubmit={formik.handleSubmit}>
            <div className="games">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <input
                  className="form-control my-3 w-50"
                  name="name"
                  placeholder="game..."
                  value={formik.values.name}
                  required
                  onChange={formik.handleChange}
                />
                <input
                  name="type"
                  className="form-control my-3 w-50"
                  placeholder="type..."
                  value={formik.values.type}
                  required
                  onChange={formik.handleChange}
                />
                <input
                  className="form-control my-3 w-50"
                  name="price"
                  placeholder="price of this game..."
                  value={formik.values.price}
                  required
                  onChange={formik.handleChange}
                />
              </div>
              <div className="text-center">{errorMsg}</div>
              <button
                type="submit"
                className="btn btn-dark my-3 d-block mx-auto"
              >
                UPDATE GAME
              </button>
            </div>
          </form>
        ) : null}
        <Link to="/games" className="btn btn-dark my-3 d-block mx-auto w-25">
          Back
        </Link>
      </div>
    </div>
  );
}
