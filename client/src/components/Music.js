import React, { useState, useEffect } from "react";
import { useStore } from "../context/StoreProvider";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Music() {
  const { music, logged, setMusic } = useStore();
  const [errorMsg, setErrorMsg] = useState(null);
  const [showed, setShowed] = useState(null);

  useEffect(() => {
    setShowed(music);
  }, [music]);

  const handleDelete = async (id) => {
    axios
      .delete(`/api/music${id}`)
      .then((res) => console.log("music deleted"))
      .catch((err) => console.error(err));
    await setMusic((x) => x.filter((m) => m.id !== id));
  };

  const handleSubmit = async (val) => {
    axios
      .post("/api/music", val)
      .then((res) => {
        console.log("music posted");
        setErrorMsg(null);
      })
      .catch((err) => setErrorMsg(err));
    await setMusic((prev) => [...prev, val]);
  };

  const formikS = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      values.search !== ""
        ? axios
            .get("/api/music/" + values.search)
            .then((res) => setShowed(res.data))
            .catch((err) => console.error(err))
        : setShowed(music);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      author: "",
      type: "",
      length: "",
      id: uuidv4(),
    },
    onSubmit: (values) => {
      handleSubmit(values);
      formik.resetForm({
        name: "",
        author: "",
        type: "",
        length: "",
        id: uuidv4(),
      });
    },
  });

  const musicList =
    showed !== null ? (
      showed.map((m) => (
        <div
          className="my-2 d-flex justify-content-between align-items-center"
          key={m.id}
        >
          {m.name} by {m.author}. Length: {m.length}. Type : {m.type}.
          <div>
            <button
              onClick={() => handleDelete(m.id)}
              className="btn btn-dark mx-2"
            >
              Delete
            </button>
            {logged.type === "admin" ? (
              <Link to={`/music/${m.id}/edit`} className="btn btn-dark">
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
            <div className="music">
              <div className="d-flex justify-content-center flex-column align-items-center">
                <input
                  className="form-control my-3 w-50"
                  name="name"
                  placeholder="playlist name..."
                  value={formik.values.name}
                  required
                  onChange={formik.handleChange}
                />
                <input
                  name="author"
                  className="form-control my-3 w-50"
                  placeholder="author of playlist..."
                  value={formik.values.author}
                  required
                  onChange={formik.handleChange}
                />
                <input
                  className="form-control my-3 w-50"
                  name="type"
                  placeholder="music type..."
                  value={formik.values.type}
                  required
                  onChange={formik.handleChange}
                />
                <input
                  className="form-control my-3 w-50"
                  name="length"
                  placeholder="playlist length..."
                  value={formik.values.length}
                  required
                  onChange={formik.handleChange}
                />
              </div>
              <div className="text-center">{errorMsg}</div>
              <button
                type="submit"
                className="btn btn-dark my-3 d-block mx-auto"
              >
                ADD MUSIC
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
            placeholder="Search your favorite playlist..."
            value={formikS.values.search}
            onChange={formikS.handleChange}
          />
          <button type="submit" className="btn btn-dark">
            Search
          </button>
        </form>
        <h2 className="text-center my-4">Music:</h2>
        {musicList}
      </div>
    </div>
  );
}
