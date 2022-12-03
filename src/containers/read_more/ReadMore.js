import React, { useState } from "react";
import "./ReadMore.css";
import { serverUrl } from "../../config";
import { Header, Blog, BackToTop } from "../../components";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

function ReadMore() {
  const { id } = useParams("id");

  const [post, setPost] = useState(null);

  if (id) {
    const requestUrl = serverUrl + "posts/" + id;
    const getPostRes = async () => {
      await axios
        .get(requestUrl)
        .then((response) => {
          setPost(response.data);
        })
        .catch((err) => {
          console.log(err);
        });

      return true;
    };
    getPostRes();
  } else {
    console.log("Id not found");
  }

  const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  function showDate(date) {
    const event = new Date(date);

    const options = {
      // weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return event.toLocaleDateString("en-us", options);
  }

  return (
    <div className="ReadMore">
      <Header activeLink="blogs" />
      <div className="container py-3">
        <div className="w-100 mb-3 text-end">
          <Link to="/blogs" className="btn btn-success ">
            <i class="bi bi-chevron-double-left"></i> Back
          </Link>
        </div>
        {post !== null ? (
          <Blog
            controls={false}
            id={post._id}
            title={post.title}
            description={post.content}
            createdBy={
              showDate(post.date) + " | by " + capitalize(post.userName)
            }
            image={post.image}
            readmore={true}
          />
        ) : (
          <div className="p-4 py-5 text-center bg-light rounded text-muted">
            <h3>No Post found!</h3>
          </div>
        )}
      </div>
      <BackToTop />
    </div>
  );
}

export default ReadMore;
