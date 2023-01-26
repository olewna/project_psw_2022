import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams, Link } from "react-router-dom";
import { useStore } from "../context/StoreProvider";
import axios from "axios";

export default function FoodEdit() {
  const { id } = useParams();
  const { logged, setFood, food, loading } = useStore();
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentFood, setCurrentFood] = useState(
    !loading && food.filter((f) => f.id === id)[0]
  );

  const handleSubmit = async (val) => {
    axios
      .patch(`/api/food/${id}`, val)
      .then((res) => console.log("food patched") && setErrorMsg(null))
      .catch((err) => setErrorMsg(err));
    await setFood((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          return val;
        } else return f;
      })
    );
  };

  useEffect(() => {
    setCurrentFood(!loading && food.filter((f) => f.id === id)[0]);
  }, [food]);

  const formik = useFormik({
    initialValues: {
      name: !loading && currentFood.name,
      company: !loading && currentFood.company,
      telephone: !loading && currentFood.telephone,
      id: id,
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
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
              UPDATE FOOD
            </button>
          </div>
        </form>
      ) : null}
      <Link to="/food" className="btn btn-dark my-3 d-block mx-auto w-25">
        Back
      </Link>
    </div>
  );
}
