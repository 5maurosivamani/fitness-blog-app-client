import "./Login.css";
import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { serverUrl } from "../../config";

import LoginIcon from "@mui/icons-material/Login";
import PasswordIcon from "@mui/icons-material/Password";
import PersonIcon from "@mui/icons-material/Person";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const validate = (values) => {
  const errors = {};

  const userName = values.userName.trim();
  const password = values.password;

  if (userName === "") {
    errors.userName = "Enter the username";
  }

  if (password === "") {
    errors.password = "Enter the password";
  }

  return errors;
};

function Login() {
  const [visible, setVisible] = useState(false);

  const changePasswordType = (value) => {
    setVisible(value);
  };

  const visibleEventProps = {
    onMouseDown: () => {
      changePasswordType(true);
    },
    onMouseUp: () => {
      changePasswordType(false);
    },
    onTouchStart: () => {
      changePasswordType(true);
    },
    onTouchEnd: () => {
      changePasswordType(false);
    },
    onDrag: () => {
      changePasswordType(false);
    },
  };

  const [alertMessage, setAlertMessage] = useState({
    show: false,
  });

  // Formik validation
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      const formData = {
        username: values.userName,
        password: values.password,
      };
      await axios
        .post(serverUrl + "users/login", formData)
        .then((response) => {
          const resData = response.data;
          const status = resData.status;
          let alertMess = {};

          if (status === "invalid-user" || status === "invalid-password") {
            alertMess = {
              status: "error",
              message: "Invalid username or password!",
              bsClass: "danger",
            };
          } else if (status === "valid") {
            alertMess = {
              status: "success",
              message: "Successfully logged in!",
              bsClass: "success",
            };

            window.localStorage.setItem("authToken", resData.token);
            window.localStorage.setItem("userName", resData.username);
            window.localStorage.setItem("userId", resData.userid);

            setTimeout(() => {
              setAlertMessage({ show: false });
              window.location.reload();
            }, 1000);
          }

          setAlertMessage((prev) => ({ ...alertMess, show: true }));

          setTimeout(() => {
            setAlertMessage({ show: false });
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <>
      {/* <!-- Modal --> */}
      <div
        className="modal fade "
        id="loginModel"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div
                className={`text-center  err-animation alert alert-${
                  alertMessage.show && alertMessage.bsClass
                } ${alertMessage.show && " show"}`}
                role="alert"
              >
                {alertMessage.message}
              </div>

              <h3 className="user-select-none text-center text-success mb-4 ">
                Login
              </h3>

              <div className="container px-md-5">
                <form
                  action="#"
                  autoComplete="off"
                  onSubmit={formik.handleSubmit}
                  noValidate
                >
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                      Username:
                    </label>
                    <div className="input-group">
                      <span className="input-group-text" id="username-addon">
                        <PersonIcon />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
                        name="userName"
                        aria-describedby="username-addon"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userName}
                        placeholder="Username"
                        required
                      />
                    </div>

                    {formik.touched.userName && formik.errors.userName ? (
                      <small className="text-danger">
                        {formik.errors.userName}
                      </small>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <div className="input-group">
                      <span className="input-group-text" id="password-addon">
                        <PasswordIcon />
                      </span>
                      <input
                        type={visible ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        aria-describedby="password-addon"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="Password"
                        required
                      />

                      <button
                        type="button"
                        className="input-group-text "
                        id="password-addon"
                        {...visibleEventProps}
                      >
                        {visible ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                      </button>
                    </div>

                    {formik.touched.password && formik.errors.password ? (
                      <small className="text-danger">
                        {formik.errors.password}
                      </small>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success d-block mb-3 w-100"
                  >
                    <LoginIcon /> Login
                  </button>

                  <p className="text-center text-muted">
                    Not a member?{" "}
                    <span
                      className="link-success cursor-pointer user-select-none"
                      data-bs-toggle="modal"
                      data-bs-target="#registerModel"
                    >
                      Signup
                    </span>
                  </p>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
