import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import {
  Home,
  Blogs,
  About,
  Contact,
  Login,
  Register,
  CreatePost,
  CreateNewBlog,
  ReadMore,
  Tableview,
} from "./containers";
import { Loading } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { serverUrl } from "./config";

export const LoginStatusContext = React.createContext();
export const LoginInfo = React.createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const [loginDetails, setLoginDetails] = useState({});

  axios.defaults.withCredentials = true;

  const getDatas = async () => {
    const token = window.localStorage.getItem("authToken");

    await axios
      .get(serverUrl + "users/auth", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        const username = window.localStorage.getItem("userName");
        const userid = window.localStorage.getItem("userId");

        if (response.data.auth) {
          setLoggedIn(true);

          const userDetails = {
            user: {
              username,
              userid,
            },
            loggedIn: true,
          };

          setLoginDetails(userDetails);
        } else {
          setLoggedIn(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getDatas();
  }, []);

  const homeRoute = <Home />;
  const blogsRoute = <Blogs />;
  const aboutRoute = <About />;
  const contactRoute = <Contact />;
  const createPostRoute = loggedIn === true ? <CreateNewBlog /> : <Home />;
  const readMoreRoute = <ReadMore />;
  const tableView = <Tableview />;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <LoginInfo.Provider value={loginDetails}>
      <LoginStatusContext.Provider value={loggedIn}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={homeRoute} />
            <Route path="/blogs" element={blogsRoute} />
            <Route path="/about" element={aboutRoute} />
            <Route path="/contact" element={contactRoute} />
            <Route path="/blogs/new" element={createPostRoute} />
            <Route path="/blogs/edit/:id" element={createPostRoute} />
            <Route path="/blogs/readmore/:id" element={readMoreRoute} />
            <Route path="/blogs/tableview" element={tableView} />
          </Routes>
        </BrowserRouter>
        <Login />
        <Register />
      </LoginStatusContext.Provider>
    </LoginInfo.Provider>
  );
}

export default App;
