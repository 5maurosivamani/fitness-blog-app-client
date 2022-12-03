import React, { useState, useEffect, useContext } from "react";

import "./Blogs.css";
import { Header, Blog, BackToTop, Loading } from "../../components";
import { serverUrl } from "../../config";
import { LoginStatusContext } from "../../App";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

function Blogs() {
  const loggedIn = useContext(LoginStatusContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(serverUrl + "posts")
        .then((response) => {
          setPosts(response.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };

    fetchPosts();
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

  const handleDelete = async (postId) => {
    await confirmAlert({
      // title: "Confirm to delete:",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const axiosLink = serverUrl + "posts/" + postId;

            const filtered = posts.filter((post) => post._id !== postId);

            await axios
              .delete(axiosLink)
              .then((response) => {
                setTimeout(async () => {
                  setPosts(filtered);

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
    <div className="Blogs">
      <Header activeLink="blogs" />
      <div className="container py-3">
        {loggedIn && (
          <div className="w-100 mb-3 text-end">
            <Link to="/blogs/new" className="btn btn-success ">
              Create new <LibraryAddIcon />
            </Link>
          </div>
        )}
        {posts.length === 0 ? (
          <div className="p-4 py-5 text-center bg-light rounded text-muted">
            <h3>No Records found!</h3>
          </div>
        ) : (
          posts.map((post, index) => (
            <Blog
              controls={loggedIn}
              id={post._id}
              title={post.title}
              description={post.content}
              createdBy={
                showDate(post.date) + " | by " + capitalize(post.userName)
              }
              image={post.image}
              key={uuidv4()}
              handleDelete={handleDelete}
            />
          ))
        )}
      </div>
      <BackToTop />
    </div>
  );
}

export default Blogs;
