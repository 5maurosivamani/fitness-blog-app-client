import React, { useState } from "react";
import "./Blog.css";

import { HeroButton } from "../../components";
import { serverUrl } from "../../config";

function Blog({
  blogTitle,
  blogDetails,
  blogDescription,
  blogImage,
  postId,
  button,
  handleDelete,
}) {
  return (
    <div className="Blog">
      <h3>{blogTitle}</h3>
      <p className="Blog__upload-details">{blogDetails}</p>
      <div className="Blog__image-and_buttons">
        <div className="Blog__image">
          <img src={serverUrl + "images/" + blogImage} alt="Flexibility" />
        </div>
        {button === "false" ? null : (
          <div className="buttons">
            <HeroButton
              redirectTo={`/blogs/edit/${postId}`}
              buttonValue="Edit"
              iconClass="fas fa-pencil"
            />
            <HeroButton
              redirectTo={`#`}
              buttonValue="Delete"
              iconClass="fas fa-trash"
              handleClick={() => {
                handleDelete(postId);
              }}
            />
          </div>
        )}
      </div>

      <p
        className="Blog__description"
        dangerouslySetInnerHTML={{
          __html: blogDescription.replaceAll("\n", "<br>"),
        }}
      ></p>
      {button === "false" ? null : (
        <HeroButton
          redirectTo={"/blogs/individual/" + postId}
          buttonValue="Read More"
          iconClass="fa-solid fa-angles-right"
        />
      )}
    </div>
  );
}

export default Blog;
