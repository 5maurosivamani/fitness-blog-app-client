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
  CreateNewBlog,
  ShowIndividualBlog,
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

  const homeRoute = loggedIn === true ? <Home /> : <Login />;
  // const blogsRoute = loggedIn === true ? <Blogs /> : <Login />;
  const blogsRoute = <Blogs />;
  const aboutRoute = loggedIn === true ? <About /> : <Login />;
  const contactRoute = loggedIn === true ? <Contact /> : <Login />;
  const createNewBlogRoute = loggedIn === true ? <CreateNewBlog /> : <Login />;
  // const showIndividualblog =
  //   loggedIn === true ? <ShowIndividualBlog /> : <Login />;
  const showIndividualblog = <ShowIndividualBlog />;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <LoginInfo.Provider value={loginDetails}>
      <LoginStatusContext.Provider value={loggedIn}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={loggedIn ? homeRoute : blogsRoute} />
            <Route path="/blogs" element={blogsRoute} />
            <Route path="/about" element={aboutRoute} />
            <Route path="/contact" element={contactRoute} />
            <Route path="/blogs/new" element={createNewBlogRoute} />
            <Route path="/blogs/edit/:id" element={createNewBlogRoute} />
            <Route path="/blogs/individual/:id" element={showIndividualblog} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </LoginStatusContext.Provider>
    </LoginInfo.Provider>
  );
}

export default App;
