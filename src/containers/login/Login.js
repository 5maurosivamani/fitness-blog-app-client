import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { serverUrl } from "../../config";
import {
  Header,
  HeroButton,
  Input,
  InputError,
  SuccessAlert,
} from "../../components";
import axios from "axios";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (formSubmitted === true) {
      formValidation();
    }
  }, [userName, password]);

  function userNameHandleChange(event) {
    setUserName(event.target.value);
  }

  function passwordHandleChange(event) {
    setPassword(event.target.value);
  }

  const handleClick = async () => {
    setFormSubmitted(true);

    const resValidation = formValidation();
    if (resValidation === true) {
      const userDetails = {
        username: userName,
        password: password,
      };
      await axios
        .post(serverUrl + "users/login", userDetails)
        .then((response) => {
          const resData = response.data;
          const status = resData.status;

          console.log(resData);

          if (status === "invalid-user" || status === "invalid-password") {
            setAlertMessage("Invalid Username Or Password!");
          } else if (status === "valid") {
            window.localStorage.setItem("authToken", resData.token);
            window.localStorage.setItem("userName", resData.username);
            window.localStorage.setItem("userId", resData.userid);

            setLoginSuccess(true);

            setTimeout(() => {
              setLoginSuccess(false);
              navigate("/");
              window.location.reload();
            }, 1000);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  function formValidation() {
    setUserNameError("");
    setPasswordError("");
    setAlertMessage("");

    if (userName === "") {
      setUserNameError("Please Enter the username.");
    } else if (password === "") {
      setPasswordError("Please Enter the password.");
    } else {
      return true;
    }
  }

  return (
    <div className="Login">
      <Header />
      <div className="Login__container">
        <form action="" autoComplete="off">
          <InputError
            errorMessage={alertMessage}
            Style={alertMessage === "" && { display: "none" }}
          />
          <Input
            placeHolder="User Name"
            Type="text"
            inputName="userName"
            iconClass="fa-solid fa-user"
            handleChange={userNameHandleChange}
            inputValue={userName}
          />
          <InputError
            errorMessage={userNameError}
            Style={userNameError === "" && { display: "none" }}
          />
          <Input
            placeHolder="Password"
            Type="password"
            inputName="password"
            iconClass="fa-solid fa-key"
            handleChange={passwordHandleChange}
            inputValue={password}
          />
          <InputError
            errorMessage={passwordError}
            Style={passwordError === "" && { display: "none" }}
          />
          <br />
          <HeroButton
            redirectTo="/login"
            buttonValue="Login"
            iconClass="fa-solid fa-arrow-right-to-bracket"
            handleClick={handleClick}
          />
        </form>
      </div>
      <SuccessAlert
        success={loginSuccess}
        setSuccess={setLoginSuccess}
        successMessage="Login Success!"
      />
    </div>
  );
}

export default Login;
