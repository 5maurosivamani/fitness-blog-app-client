import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./Blogs.css";
import { serverUrl } from "../../config";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { LoginStatusContext } from "../../App";
import {
  Blog,
  Header,
  GreyboxDesign,
  HeroButton,
  BackToTop,
  SuccessAlert,
  Loading,
} from "../../components";

function Blogs() {
  const LoggedIn = useContext(LoginStatusContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(serverUrl + "posts")
        .then((response) => {
          setPosts(response.data);
        })
        .catch((err) => console.log(err));
    };

    fetchPosts();

    setIsLoading(false);
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
    const confirm = await confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const axiosLink = serverUrl + "posts/" + postId;

            const filtered = posts.filter((post) => {
              if (post._id !== postId) {
                return post;
              }
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

                setTimeout(async () => {
                  setDeleteSuccess(false);

                  setPosts(filtered);

                  // await setPosts((previousPosts) => {
                  //   return posts.filter((post) => {
                  //     if (post._id !== postId) {
                  //       return post;
                  //     }
                  //   });
                  // });
                  navigate("/blogs");
                  // window.location.reload();
                }, 1000);
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
        {
          label: "No",
          onClick: () => false,
        },
      ],
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="Blogs">
        <Header />
        <div className="Blogs__content">
          <div className="Blogs__content-container">
            <GreyboxDesign />
            <div className="Blogs_content-container_posts">
              <h1 className="page__heading">Blogs</h1>
              <div
                style={
                  LoggedIn
                    ? { display: "flex", justifyContent: "flex-end" }
                    : { display: "none" }
                }
              >
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
                      LoggedIn={LoggedIn}
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
