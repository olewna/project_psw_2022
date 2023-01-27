import React, { useState } from "react";
import { useStore } from "../context/StoreProvider.js";
import { useFormik } from "formik";
import Comment from "./Comment.js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export default function Comments() {
  const { comments, setComments, loading, logged } = useStore();
  const [errorMsg, setErrorMsg] = useState(null);

  const nicknaming = (nick) => {
    if (nick === "") return "Guest";
    else return nick;
  };

  const handleSubmit = async (val) => {
    axios
      .post("/api/comments", val)
      .then((res) => {
        console.log("comment posted");
        setErrorMsg(null);
      })
      .catch((err) => setErrorMsg(err));
    setComments((prev) => [...prev, val]);
  };

  const deleteComment = async (id) => {
    axios
      .delete("/api/comments/" + id)
      .then((res) => console.log("comment deleted"))
      .catch((err) => console.error(err.response));
    await setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const commentListed = !loading ? (
    comments.map((el) => (
      <Comment
        key={el.id}
        id={el.id}
        comment={el}
        deleted={() => deleteComment(el.id)}
      />
    ))
  ) : (
    <div>Loading...</div>
  );

  const formik = useFormik({
    initialValues: {
      name: nicknaming(logged.nickname),
      content: "",
      id: uuidv4(),
    },
    onSubmit: (values) => {
      handleSubmit(values);
      formik.resetForm({
        values: {
          name: nicknaming(logged.nickname),
          content: "",
          id: uuidv4(),
        },
      });
    },
  });

  return (
    <div>
      <form
        className="form my-3 border rounded p-3"
        onSubmit={formik.handleSubmit}
      >
        <div className="comments">
          <div className="comment">
            {logged.type === "" ? (
              <input
                className="form-control my-3"
                name="name"
                placeholder="WRITE YOUR NAME"
                value={formik.values.name}
                required
                onChange={formik.handleChange}
              />
            ) : (
              <div>{logged.nickname}</div>
            )}
            <input
              name="content"
              className="form-control my-3"
              placeholder="WRITE COMMENT"
              value={formik.values.content}
              required
              onChange={formik.handleChange}
            />
          </div>
          <div>{errorMsg}</div>
          <button type="submit" className="btn btn-dark my-3 d-block mx-auto">
            ADD COMMENT
          </button>
        </div>
      </form>
      {commentListed}
    </div>
  );
}
