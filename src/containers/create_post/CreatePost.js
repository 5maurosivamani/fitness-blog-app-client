import React, { useEffect, useContext, useState } from "react";
import "./CreatePost.css";

// Internal Modulues
import { Header } from "../../components";
import { LoginInfo } from "../../App";
import { serverUrl } from "../../config";

// External Modules
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Formik validation function
const validate = (values) => {
  const errors = {};
  const title = values.title;
  const content = values.content;
  const image = values.image;

  if (title.trim() === "") {
    errors.title = "Enter the blog title";
  }

  if (content.trim() === "") {
    errors.content = "Enter the blog content";
  }

  if (image === "") {
    errors.image = "Choose the blog image";
  } else if (
    !["jpeg", "jpg", "png"].includes(image.split(".").pop().toLowerCase())
  ) {
    errors.image = "Image type must be jpg, jpeg or png.";
  }

  return errors;
};

function CreatePost() {
  // Navigation
  const navigate = useNavigate();

  // get Context values
  const loginInfo = useContext(LoginInfo);

  // destructure the postId
  const { id: postId } = useParams();

  // page Information
  const [pageInfo, setpageInfo] = useState({
    name: "create",
    title: "Create new Blog",
    buttonText: "Save",
    postId: null,
    existValues: null,
  });

  // Formik submitHandler
  const submitHandler = (values) => {
    const date = new Date();

    // get username and password form loginInfo context
    const username = loginInfo.user.username;
    const userid = loginInfo.user.userid;

    // create post object
    const postData = {
      title: values.title,
      content: values.content,
      image: values.image,
      date: date,
      username,
      userid,
    };

    console.log({ ...postData });
  };

  useEffect(() => {
    if (postId) {
      setpageInfo((prev) => ({
        ...prev,
        name: "update",
        title: "Edit Blog",
        buttonText: "Update",
        postId,
      }));

      const getPost = async () => {
        const axiosUrl = serverUrl + "posts/" + postId;

        await axios
          .get(axiosUrl)
          .then((response) => {
            const resData = response.data;

            setpageInfo((prev) => ({ ...prev, existValues: resData }));
          })
          .catch((err) => {
            console.log(err);
          });
      };

      getPost();
    }
  }, []);

  const initialValues =
    pageInfo.existValues === null
      ? {
          title: "1",
          content: "",
          image: "",
        }
      : {
          title: pageInfo.existValues.title,
          content: pageInfo.existValues.content,
          image: "",
        };

  // Formik validation
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: submitHandler,
  });

  return (
    <div className="CreatePost ">
      <Header activeLink="blogs" />
      <div className="container bg-light rounded col-md-6 mx-auto py-3 pt-4 px-5 mt-3">
        <h2 className="text-success text-center mb-4">{pageInfo.title}</h2>
        <form
          action="#"
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          noValidate
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <small className="text-danger">{formik.errors.title}</small>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Content <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              id="content"
              rows="4"
              placeholder="Content"
              style={{ resize: "none" }}
              onChange={formik.handleChange}
              value={formik.values.content}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.content && formik.errors.content ? (
              <small className="text-danger">{formik.errors.content}</small>
            ) : null}
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image <span className="text-danger">*</span>
            </label>
            <input
              className="form-control"
              type="file"
              id="image"
              onChange={formik.handleChange}
              value={formik.values.image}
              onBlur={formik.handleBlur}
            />
            {formik.touched.image && formik.errors.image ? (
              <small className="text-danger">{formik.errors.image}</small>
            ) : null}
          </div>
          <div className="w-100 text-center mt-4">
            <button type="submit" className="btn btn-success mb-3">
              <i className="bi bi-check2"></i> {pageInfo.buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
