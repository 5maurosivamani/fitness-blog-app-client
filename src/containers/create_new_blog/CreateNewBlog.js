import React, { useEffect, useState, useMemo } from "react";

import "./CreateNewBlog.css";
import {
  GreyboxDesign,
  Input,
  InputError,
  HeroButton,
  TextArea,
  InputFile,
  SuccessAlert,
} from "../../components";
import { serverUrl } from "../../config";

import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

// import SaveIcon from "@mui/icons-material/Save";
import DoneIcon from "@mui/icons-material/Done";

function CreateNewBlog({ display, closeDiv }) {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState("");

  const [blogImageFile, setBlogImageFile] = useState(null);

  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [imageError, setImageError] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [pageTitle, setPageTitle] = useState("Create a New Blog");
  const [buttonName, setButtonName] = useState("Save");
  const [buttonRedirect, setButtonRedirect] = useState("/blogs/new");

  const [page, setPage] = useState("new");
  const [updatePostId, setPostId] = useState(null);

  // Edit Page Functionality
  const postIdObj = useParams("id");
  const postId = postIdObj.id;

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  useEffect(() => {
    if (postId) {
      setButtonName("Update");
      setPageTitle("Edit Blog");
      setPage("update");
      setPostId(postId);

      setButtonRedirect("/blogs/edit/" + postId);

      const getPost = async () => {
        const axiosUrl = serverUrl + "posts/" + postId;

        await axios
          .get(axiosUrl)
          .then((response) => {
            const resData = response.data;

            setBlogTitle(resData.title);
            setBlogContent(resData.content);
            setBlogImage(resData.image);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      getPost();
    }
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (formSubmitted === true) {
      formValidation();
    }
  }, [blogTitle, blogContent, blogImage]);

  function titleHandleChange(event) {
    setBlogTitle(event.target.value);
  }

  function saveHandleClick() {
    setFormSubmitted(true);

    if (formValidation()) {
      const date = new Date();

      const username = window.localStorage.getItem("userName");
      const userid = window.localStorage.getItem("userId");

      const postData = {
        title: blogTitle,
        content: blogContent,
        image: blogImage,
        date: date,
        username,
        userid,
      };

      if (page === "new" && userid !== "" && userid !== null) {
        axios
          .post(serverUrl + "posts/new", postData)
          .then(async (response) => {
            const resData = response.data;

            if (resData.status === "success") {
              setSaveSuccess(true);

              const formData = new FormData();
              formData.append("image", blogImageFile);
              formData.append("imageName", blogImage);

              await axios
                .post(serverUrl + "upload", formData)
                .then((response) => {
                  console.log("Successfully Created!");
                })
                .catch((err) => {
                  console.log(err);
                });

              setTimeout(() => {
                query.get("back") === "table"
                  ? navigate("/blogs/tableview")
                  : navigate("/blogs");
              }, 1000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        if (updatePostId !== null) {
          axios
            .put(serverUrl + "posts/" + updatePostId, postData)
            .then(async (response) => {
              const resData = response.data;

              if (resData.status === "success") {
                setSaveSuccess(true);

                const formData = new FormData();
                formData.append("image", blogImageFile);
                formData.append("imageName", blogImage);

                await axios
                  .post(serverUrl + "upload", formData)
                  .then((response) => {
                    // console.log(response.data);
                    console.log("Successfully Uploded!");
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                setTimeout(() => {
                  query.get("back") === "table"
                    ? navigate("/blogs/tableview")
                    : navigate("/blogs");
                }, 1000);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("No post Id Found");
        }
      }
    }
  }

  const formValidation = () => {
    setTitleError("");
    setContentError("");
    setImageError("");

    if (blogTitle === "") {
      setTitleError("Please enter the Title.");
    } else if (blogContent === "") {
      setContentError("Please enter the Content.");
    } else if (blogImage === "") {
      if (imageError === "") {
        setImageError("Please choose a image.");
      } else {
        setImageError(imageError);
      }
    } else {
      return true;
    }
  };

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileTypeArray = fileType.split("/");

      if (fileTypeArray[0] === "image") {
        setBlogImage(Date.now() + "." + fileTypeArray[1]);
        setBlogImageFile(file);
      } else {
        setImageError("Invalid File Type!");
      }
    }
  }

  function handleChangeContent(event) {
    setBlogContent(event.target.value);
  }

  return (
    <>
      <div className="create__new__blog" style={{ display: display }}>
        <div className="create__new__blog-container">
          <GreyboxDesign />
          <Link
            to={
              query.get("back") || query.get("back") === "table"
                ? "/blogs/tableview"
                : "/blogs"
            }
            className="close-btn"
            onClick={closeDiv}
          >
            <i className="fa-solid fa-rectangle-xmark"></i>
          </Link>
          <div className="create__new__blog-container_content">
            <h1 className="page__heading">{pageTitle}</h1>

            <form action="/blogs" autoComplete="off">
              <Input
                placeHolder="Title"
                Type="text"
                inputName="blogTitle"
                handleChange={titleHandleChange}
                inputValue={blogTitle}
              />
              <InputError
                errorMessage={titleError}
                Style={
                  titleError === "" ? { display: "none" } : { display: "block" }
                }
              />
              <TextArea
                handleChange={handleChangeContent}
                textValue={blogContent}
              />
              <InputError
                errorMessage={contentError}
                Style={
                  contentError === ""
                    ? { display: "none" }
                    : { display: "block" }
                }
              />

              <InputFile handleChange={handleFileChange} />
              <InputError
                errorMessage={imageError}
                Style={
                  imageError === "" ? { display: "none" } : { display: "block" }
                }
              />
              <br />
              <HeroButton
                buttonValue={buttonName}
                redirectTo={buttonRedirect}
                icon={<DoneIcon />}
                start
                handleClick={saveHandleClick}
              />
            </form>
          </div>
        </div>
      </div>
      <SuccessAlert
        success={saveSuccess}
        setSuccess={setSaveSuccess}
        successMessage="Blog Saved Successfully!"
      />
    </>
  );
}

export default CreateNewBlog;
