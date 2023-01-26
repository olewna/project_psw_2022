import React, { useState } from "react";
import { useFormik } from "formik";
import { useStore } from "../context/StoreProvider";
import axios from "axios";

export default function Register() {
  const { users, setUsers } = useStore();
  const [message, setMessage] = useState(null);

  const fetching = async (val) => {
    await axios
      .post("/api/users", val)
      .then((res) => {
        console.log("axios post success");
      })
      .catch((err) => {
        setMessage(err.response);
      });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (users.filter((user) => user.name === values.name).length > 0) {
      errors.name = "Username taken";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (users.filter((user) => user.email === values.email).length > 0) {
      errors.email = "Email is already used";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Password too weak";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      type: "user",
    },
    validate,
    onSubmit: (values) => {
      fetching(values);
      setMessage("Account created!");
      setUsers((prev) => [...prev, values]);
      formik.resetForm({
        email: "",
        name: "",
        password: "",
        type: "user",
      });
    },
  });

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <label htmlFor="nickname">Nickname: </label>
      <input
        id="nickname"
        name="name"
        type="text"
        placeholder="Your nickname"
        onChange={formik.handleChange}
        value={formik.values.name}
        className="form-control mb-3"
      />
      {formik.errors.name ? <div>{formik.errors.name}</div> : null}
      <label htmlFor="email">Email: </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Your email"
        onChange={formik.handleChange}
        value={formik.values.email}
        className="form-control mb-3"
      />
      {formik.errors.email ? <div>{formik.errors.email}</div> : null}
      <label htmlFor="password-reg">Hasło: </label>
      <input
        id="password-reg"
        name="password"
        type="password"
        placeholder="Your password"
        onChange={formik.handleChange}
        value={formik.values.password}
        className="form-control mb-3"
      />
      {formik.errors.password ? <div>{formik.errors.password}</div> : null}
      <button className="btn btn-dark" type="submit">
        Sign up
      </button>
      <div>{message}</div>
    </form>
  );
}
