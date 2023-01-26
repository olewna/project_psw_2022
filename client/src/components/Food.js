import React, { useState, useEffect } from "react";
import { useStore } from "../context/StoreProvider";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Food() {
  const { food, logged, setFood } = useStore();
  const [errorMsg, setErrorMsg] = useState(null);
  const [showed, setShowed] = useState(null);

  useEffect(() => {
    setShowed(food);
  }, [food]);

  const handleDelete = async (id) => {
    axios
      .delete(`/api/food/${id}`)
      .then((res) => console.log("food deleted"))
      .catch((err) => console.error(err));
    await setFood((x) => x.filter((f) => f.id !== id));
  };

  const handleSubmit = async (val) => {
    axios
      .post("/api/food", val)
      .then((res) => console.log("food posted") && setErrorMsg(null))
      .catch((err) => setErrorMsg(err));
    await setFood((prev) => [...prev, val]);
  };

  const formikS = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      values.search !== ""
        ? axios
            .get("/api/food/" + values.search)
            .then((res) => setShowed(res.data))
            .catch((err) => console.error(err))
        : setShowed(food);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      company: "",
      telephone: "",
      id: uuidv4(),
    },
    onSubmit: (values) => {
      handleSubmit(values);
      formik.resetForm({
        name: "",
        company: "",
        telephone: "",
        id: uuidv4(),
      });
    },
  });

  const foodList =
    showed !== null ? (
      showed.map((f) => (
        <div className="my-2 " key={f.id}>
          {f.name} from {f.company}. Call {f.telephone}.
          <button
            onClick={() => handleDelete(f.id)}
            className="btn btn-dark mx-2"
          >
            Delete
          </button>
          {logged.type === "admin" ? (
            <Link to={`/food/${f.id}/edit`} className="btn btn-dark">
              Edit
            </Link>
          ) : null}
        </div>
      ))
    ) : (
      <div>Loading...</div>
    );

  return (
    <div>
      {logged.type === "admin" ? (
        <form className="form" onSubmit={formik.handleSubmit}>
          <div className="foods">
            <div className="food">
              <input
                className="form-control my-3"
                name="name"
                placeholder="food..."
                value={formik.values.name}
                required
                onChange={formik.handleChange}
              />
              <input
                name="company"
                className="form-control my-3"
                placeholder="company..."
                value={formik.values.company}
                required
                onChange={formik.handleChange}
              />
              <input
                className="form-control my-3"
                name="telephone"
                placeholder="telephone number..."
                value={formik.values.telephone}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                required
                onChange={formik.handleChange}
              />
            </div>
            <div>{errorMsg}</div>
            <button type="submit" className="btn btn-dark my-3 d-block mx-auto">
              ADD FOOD
            </button>
          </div>
        </form>
      ) : null}
      <form className="form d-flex" onSubmit={formikS.handleSubmit}>
        <input
          name="search"
          type="text"
          className="form-control"
          placeholder="Search your favorite food..."
          value={formikS.values.search}
          onChange={formikS.handleChange}
        />
        <button type="submit" className="btn btn-dark">
          Search
        </button>
      </form>
      <h2>Food:</h2>
      {foodList}
    </div>
  );
}
