import { React, useContext, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { LoginStatusContext, LoginInfo } from "../../App";

import IconLink from "../icon_link/IconLink";
// import axios from "axios";

function Header() {
  const loggedIn = useContext(LoginStatusContext);
  const loginInfo = useContext(LoginInfo);

  const [hamburgerClicked, setHamburgerClicked] = useState(false);

  const loginVisibility = loggedIn ? { display: "" } : { display: "none" };

  const logoutVisibility = loggedIn ? { display: "none" } : { display: "" };

  const handleLogout = async () => {
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("authToken");

    window.location.reload();
  };

  window.addEventListener("resize", () => {
    setHamburgerClicked(false);
  });

  return (
    <div className="Header">
      <div className="Header__logo">
        <h1>FITNESS TODAY</h1>
      </div>
      <div className="Header__links ">
        <div className="Ham__User">
          <div
            className="userProfile"
            style={loginVisibility}
            onMouseOver={() => {
              setHamburgerClicked(false);
            }}
          >
            <div className="userCircle">
              {loginInfo.loggedIn && loginInfo.user.username.slice(0, 1)}
            </div>
            <div className="userDetails">
              <div className="userCircle">
                {loginInfo.loggedIn && loginInfo.user.username.slice(0, 1)}
              </div>
              <p className="userDetails__name">
                {loginInfo.loggedIn && loginInfo.user.username}
              </p>
              <hr />
              <IconLink
                redirectLink="#"
                linkText="Logout"
                linkIcon="fas fa-sign-out"
                handleClick={handleLogout}
              />
            </div>
          </div>
          <div
            className="Handburger__Menu"
            onClick={() => {
              setHamburgerClicked((preVal) => !preVal);
            }}
          >
            <i className="fas fa-stream"></i>
          </div>
        </div>
        <ul
          className={
            hamburgerClicked === true
              ? "scale-up-center active"
              : "scale-down-center"
          }
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li style={loginVisibility}>
            <Link to="/about">About</Link>
          </li>
          <li style={loginVisibility}>
            <Link to="/contact">Contact</Link>
          </li>

          <li style={logoutVisibility}>
            <Link to="/register" className="login">
              Register
            </Link>
          </li>
          <li style={logoutVisibility}>
            <Link to="/login" className="login">
              Login
            </Link>
          </li>
        </ul>
      </div>
      <div className="Header__actions">
        <div className="cross-style">
          <Link to="/register" style={logoutVisibility}>
            Register
          </Link>
          <Link to="/login" style={logoutVisibility}>
            Login
          </Link>
        </div>

        <div className="userProfile" style={loginVisibility}>
          <div className="userCircle">
            {loginInfo.loggedIn && loginInfo.user.username.slice(0, 1)}
          </div>
          <div className="userDetails">
            <div className="userCircle">
              {loginInfo.loggedIn && loginInfo.user.username.slice(0, 1)}
            </div>
            <p className="userDetails__name">
              {loginInfo.loggedIn && loginInfo.user.username}
            </p>
            <hr />
            <IconLink
              redirectLink="#"
              linkText="Logout"
              linkIcon="fas fa-sign-out"
              handleClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
