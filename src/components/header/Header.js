import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Header.css";

import { LoginStatusContext } from "../../App";

function Header({ activeLink }) {
  const loggedIn = useContext(LoginStatusContext);

  const handleLogout = () => {
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("authToken");

    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success p-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h1 className="h3 fw-bolder my-auto d-flex align-items-center">
            FITNESS TODAY
          </h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ms-5">
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === "home" && "active"}`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === "blogs" && "active"}`}
                aria-current="page"
                to="/blogs"
              >
                Blogs
              </Link>
            </li>

            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeLink === "about" && "active"}`}
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeLink === "contact" && "active"}`}
                  aria-current="page"
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </>
          </ul>

          {loggedIn ? (
            <Link
              className="btn btn-outline-light"
              aria-current="page"
              to="#"
              onClick={handleLogout}
            >
              <LogoutIcon className="fs-5 my-auto" /> Log Out
            </Link>
          ) : (
            <Link
              className="btn btn-outline-light"
              aria-current="page"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#loginModel"
            >
              <LoginIcon className="fs-5 my-auto" /> Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
