import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams, Link } from "react-router-dom";
import { useStore } from "../context/StoreProvider";
import axios from "axios";

export default function MusicEdit() {
  const { id } = useParams();
  const { logged, setMusic, music, loading } = useStore();
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentMusic, setCurrentMusic] = useState(
    !loading && music.filter((m) => m.id === id)[0]
  );

  const handleSubmit = async (val) => {
    axios
      .patch(`/api/music/${id}`, val)
      .then((res) => {
        console.log("music patched");
        setErrorMsg("Updated!");
      })
      .catch((err) => setErrorMsg(err));
    await setMusic((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          return val;
        } else return m;
      })
    );
  };

  useEffect(() => {
    setCurrentMusic(!loading && music.filter((m) => m.id === id)[0]);
  }, [music, loading, id]);

  const formik = useFormik({
    initialValues: {
      name: !loading && currentMusic.name,
      author: !loading && currentMusic.author,
      type: !loading && currentMusic.type,
      length: !loading && currentMusic.length,
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
            <div className="music">
              <div className="d-flex flex-column justify-content-center align-items-center">
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
                UPDATE MUSIC
              </button>
            </div>
          </form>
        ) : null}
        <Link to="/music" className="btn btn-dark my-3 d-block mx-auto w-25">
          Back
        </Link>
      </div>
    </div>
  );
}
