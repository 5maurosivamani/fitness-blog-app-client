import React, { useState } from "react";
import { useFormik } from "formik";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PasswordIcon from "@mui/icons-material/Password";
import PersonIcon from "@mui/icons-material/Person";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { serverUrl } from "../../config";
import axios from "axios";

const validate = (values) => {
  const errors = {};

  const userName = values.userName.trim();
  const password = values.password;
  const confirmPassword = values.confirmPassword;

  if (userName === "") {
    errors.userName = "Enter the username";
  } else if (!userName.charAt(0).match(/^[a-zA-Z]$/)) {
    errors.userName = "1st letter must be a letter (Ex: Alan123)";
  } else if (
    userName.length > 1 &&
    !userName.slice(1, userName.length).match(/^[a-zA-Z0-9_ ]+$/)
  ) {
    errors.userName = "Alphanumeric only allowed";
  } else if (userName.length < 3 || userName.length > 30) {
    errors.userName = "Minimum 3 and maximum 30 characters";
  }

  if (password === "") {
    errors.password = "Enter the password";
  } else if (password.length < 8 || password.length > 30) {
    errors.password = "Minimum 8 and maximum 30 characters";
  } else if (confirmPassword === "") {
    errors.confirmPassword = "Enter the confirm password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Password and confirm password doesn't match!";
  }

  return errors;
};

function Register() {
  const [visible, setVisible] = useState(false);

  const changePasswordType = (value) => {
    setVisible(value);
  };

  // for visible password eye icon
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
  };

  const [alertMessage, setAlertMessage] = useState({
    show: false,
  });

  // Formik validation
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: async (values) => {
      const formData = {
        username: values.userName,
        password: values.password,
      };
      await axios
        .post(serverUrl + "users/new", formData)
        .then((response) => {
          const resData = response.data;
          let alertMess = {};

          if (resData === "failed") {
            alertMess = {
              status: "error",
              mess: "Insertion Failed!",
              bsClass: "danger",
            };
          } else if (resData === "exist") {
            alertMess = {
              status: "warning",
              mess: "Username Already Exist! Choose another name",
              bsClass: "warning",
            };
          } else if (resData === "success") {
            alertMess = {
              status: "success",
              mess: "Successfully registered!",
              bsClass: "success",
            };
            formik.resetForm();
          }

          setAlertMessage((prev) => ({ show: true, ...alertMess }));

          setTimeout(() => {
            setAlertMessage({ show: false });
          }, 5000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
      {/* <!-- Modal --> */}

      <div
        className="modal fade "
        id="registerModel"
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
                {alertMessage.mess}
              </div>

              <h3 className="user-select-none text-center text-success mb-4 ">
                Register
              </h3>

              <div className="container px-md-5">
                <form
                  action="#"
                  noValidate
                  onSubmit={formik.handleSubmit}
                  autoComplete="off"
                >
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">
                      Username: <span className="text-danger">*</span>
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userName}
                        placeholder="Username"
                        aria-describedby="username-addon"
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
                      Password: <span className="text-danger">*</span>
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="Password"
                        aria-describedby="password-addon"
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

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Confirm Password: <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text" id="password-addon">
                        <PasswordIcon />
                      </span>
                      <input
                        type={visible ? "text" : "password"}
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        placeholder="Confirm password"
                        aria-describedby="password-addon"
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

                    {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                      <small className="text-danger">
                        {formik.errors.confirmPassword}
                      </small>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success form-control mb-3"
                  >
                    <HowToRegIcon /> Register
                  </button>

                  <p className="text-center text-muted">
                    Already have an account?{" "}
                    <span
                      className="link-success cursor-pointer user-select-none"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModel"
                    >
                      Login
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

export default Register;
