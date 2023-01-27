import React, { useState, useEffect } from "react";
import { useStore } from "../context/StoreProvider";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Games() {
  const { games, logged, setGames } = useStore();
  const [errorMsg, setErrorMsg] = useState(null);
  const [showed, setShowed] = useState(null);

  useEffect(() => {
    setShowed(games);
  }, [games]);

  const handleDelete = async (id) => {
    axios
      .delete(`/api/games/${id}`)
      .then((res) => console.log("game deleted"))
      .catch((err) => console.error(err));
    await setGames((x) => x.filter((f) => f.id !== id));
  };

  const handleSubmit = async (val) => {
    axios
      .post("/api/games", val)
      .then((res) => console.log("game posted") && setErrorMsg(null))
      .catch((err) => setErrorMsg(err));
    await setGames((prev) => [...prev, val]);
  };

  const formikS = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      values.search !== ""
        ? axios
            .get("/api/games/" + values.search)
            .then((res) => setShowed(res.data))
            .catch((err) => console.error(err))
        : setShowed(games);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      price: "",
      id: uuidv4(),
    },
    onSubmit: (values) => {
      handleSubmit(values);
      formik.resetForm({
        name: "",
        type: "",
        price: "",
        id: uuidv4(),
      });
    },
  });

  const gamesList =
    showed !== null ? (
      showed.map((g) => (
        <div
          className="my-2 d-flex justify-content-between align-items-center"
          key={g.id}
        >
          {g.name} for {g.price}. Type: {g.type}.
          <div>
            <button
              onClick={() => handleDelete(g.id)}
              className="btn btn-dark mx-2"
            >
              Delete
            </button>
            {logged.type === "admin" ? (
              <Link to={`/games/${g.id}/edit`} className="btn btn-dark">
                Edit
              </Link>
            ) : null}
          </div>
        </div>
      ))
    ) : (
      <div>Loading...</div>
    );

  return (
    <div className="container">
      <div className="row">
        {logged.type === "admin" ? (
          <form className="form" onSubmit={formik.handleSubmit}>
            <div className="games">
              <div className="d-flex justify-content-center flex-column align-items-center">
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
                  placeholder="price..."
                  value={formik.values.price}
                  required
                  onChange={formik.handleChange}
                />
              </div>
              <div>{errorMsg}</div>
              <button
                type="submit"
                className="btn btn-dark my-3 d-block mx-auto"
              >
                ADD GAME
              </button>
            </div>
          </form>
        ) : null}
        <form
          className="form d-flex justify-content-center mt-4 mb-2"
          onSubmit={formikS.handleSubmit}
        >
          <input
            name="search"
            type="text"
            className="form-control w-50"
            placeholder="Search your favorite games..."
            value={formikS.values.search}
            onChange={formikS.handleChange}
          />
          <button type="submit" className="btn btn-dark">
            Search
          </button>
        </form>
        <h2 className="text-center my-4">Games:</h2>
        {gamesList}
      </div>
    </div>
  );
}
