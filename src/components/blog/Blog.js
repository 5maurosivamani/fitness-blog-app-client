import React from "react";
import "./Blog.css";
import { serverUrl, baseUrl } from "../../config.js";

import { Link, useNavigate } from "react-router-dom";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Blog({
  controls,
  id,
  title,
  description,
  createdBy,
  image,
  handleDelete,
  readmore,
}) {
  const navigate = useNavigate();

  function imageExists(imageName) {
    const image_url = `${serverUrl}images/${imageName}`;
    const http = new XMLHttpRequest();

    http.open("GET", image_url, false);
    http.send();

    return http.status !== 404;
  }

  return (
    <div className="Blog">
      <div className="card mb-3">
        <div className="row g-0">
          <div className={!readmore ? "col-md-4" : ""}>
            <img
              src={`${baseUrl}images/${
                imageExists(image) ? image : "default.jpeg"
              }`}
              className={
                !readmore
                  ? "img-fluid  rounded-start"
                  : "img-fluid  rounded-start read-more"
              }
              alt="fitness"
              style={{ height: "100%" }}
            />
          </div>
          <div className={!readmore ? "col-md-8" : ""}>
            <div className="card-body d-flex flex-column justify-content-between h-100">
              <div>
                <h5 className="card-title text-success">{title}</h5>
                <p
                  className="card-text overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html: description.replaceAll("\n", "<br/>"),
                  }}
                  style={!readmore ? { height: "100px" } : {}}
                ></p>
              </div>
              <div className="mt-3 row">
                <div className="col-lg-6">
                  {!readmore ? (
                    <Link
                      to={`/blogs/readmore/${id}`}
                      className="btn btn-success me-5"
                    >
                      Read more <KeyboardDoubleArrowRightIcon />
                    </Link>
                  ) : null}

                  {controls && (
                    <>
                      {" "}
                      <button
                        onClick={() => {
                          navigate(`/blogs/edit/${id}`);
                        }}
                        className="btn btn-light text-success me-2 rounded-btn"
                        title="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="btn btn-light text-success me-2 rounded-btn"
                        title="Delete"
                        onClick={() => {
                          handleDelete(id);
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </>
                  )}
                </div>

                <p className="card-text d-flex align-items-center justify-content-end col-lg-6 mt-3 mt-lg-0">
                  <small className="text-muted">{createdBy}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
