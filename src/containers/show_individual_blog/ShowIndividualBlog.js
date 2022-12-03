import React, { useState } from "react";
import "./ShowIndividualBlog.css";
import { serverUrl } from "../../config";
import {
  Header,
  GreyboxDesign,
  Blog,
  BackToTop,
  HeroButton,
} from "../../components";
import { useParams } from "react-router-dom";
import axios from "axios";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ShowIndividualBlog() {
  const postId = useParams("id");

  const [post, setPost] = useState(null);

  if (postId) {
    const requestUrl = serverUrl + "posts/" + postId.id;
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
    <>
      <Header />

      <div className="Show__Individual__blog">
        <div className="Show__Individual__blog-container">
          <GreyboxDesign />
          <div className="Show__Individual__blog-container_blog">
            <HeroButton
              redirectTo="/blogs"
              buttonValue="Back"
              float="right"
              icon={<ArrowBackIcon />}
              start
            />

            {post !== null ? (
              <Blog
                postId={post._id}
                blogTitle={post.title}
                blogDetails={
                  showDate(post.date) + " | by " + capitalize(post.userName)
                }
                blogDescription={post.content}
                blogImage={post.image}
                button="false"
              />
            ) : null}
          </div>
        </div>
        <BackToTop />
      </div>
    </>
  );
}

export default ShowIndividualBlog;
