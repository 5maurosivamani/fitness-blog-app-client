import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./Blogs.css";
import { serverUrl } from "../../config";
import {
  Blog,
  Header,
  GreyboxDesign,
  HeroButton,
  BackToTop,
  SuccessAlert,
} from "../../components";

function Blogs() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(serverUrl + "posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
  const navigate = useNavigate();
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleDelete = async (postId) => {
    const confirm = confirm("Do you want to Delete this Blog?");
    if (confirm != true) {
      return;
    }

    const axiosLink = serverUrl + "posts/" + postId;

    const filtered = posts.filter((post) => {
      if (post._id !== postId) {
        return post;
      }
    });

    setPosts((previousPosts) => {
      return posts.filter((post) => {
        if (post._id !== postId) {
          return post;
        }
      });
    });

    await axios
      .delete(axiosLink)
      .then((response) => {
        // console.log(response.data);

        // const scrolled = document.documentElement.scrollTop;
        // window.scrollTo({
        //   top: 0,
        //   behavior: "smooth",
        // });

        setDeleteSuccess(true);

        setTimeout(() => {
          setDeleteSuccess(false);
          navigate("/blogs");
          // window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="Blogs">
        <Header />
        <div className="Blogs__content">
          <div className="Blogs__content-container">
            <GreyboxDesign />
            <div className="Blogs_content-container_posts">
              <h1 className="page__heading">Blogs</h1>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <HeroButton
                  redirectTo="/blogs/new"
                  buttonValue="Create New"
                  iconClass="fa-solid fa-plus"
                />
              </div>
              {posts.length === 0 ? (
                <div className="Blog">
                  <h3 style={{ textAlign: "center" }}>No Posts Found!</h3>
                </div>
              ) : (
                posts.map((post, index) => {
                  return (
                    <Blog
                      postId={post._id}
                      blogTitle={post.title}
                      blogDetails={
                        showDate(post.date) +
                        " | by " +
                        capitalize(post.userName)
                      }
                      blogDescription={post.content.slice(0, 600) + "..."}
                      blogImage={post.image}
                      key={uuidv4()}
                      handleDelete={handleDelete}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
        <BackToTop />
        <SuccessAlert
          success={deleteSuccess}
          setSuccess={setDeleteSuccess}
          successMessage="Successfully Deleted!"
          style={{ top: "100%" }}
        />
      </div>
    </>
  );
}

export default Blogs;
