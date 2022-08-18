import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { serverUrl } from "../../config";
import {
  Header,
  HeroButton,
  Input,
  InputError,
  SuccessAlert,
} from "../../components";
import axios from "axios";

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [alertMessage, setAlertMessage] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (formSubmitted === true) {
      registerFormValidation();
    }
  }, [userName, password, confirmPassword]);

  function userNameHandleChange(event) {
    setUserName(event.target.value);
  }

  function passwordHandleChange(event) {
    setPassword(event.target.value);
  }

  function confirmPasswordHandleChange(event) {
    setConfirmPassword(event.target.value);
  }

  function handleClick() {
    registerFormValidation();
    setFormSubmitted(true);
    if (registerFormValidation() === true) {
      function resetForm() {
        setUserName("");
        setPassword("");
        setConfirmPassword("");

        setFormSubmitted(false);
      }

      const formData = {
        username: userName,
        password: password,
      };
      axios
        .post(serverUrl + "users/new", formData)
        .then((response) => {
          if (response) {
            const resData = response.data;
            let alertMessage = "";

            if (resData === "failed") {
              alertMessage = "Insertion Failed!";
              resetForm();
            } else if (resData === "exist") {
              alertMessage = "Username Already Exist!";
            } else if (resData === "success") {
              setRegSuccess(true);
              resetForm();

              setTimeout(() => {
                setRegSuccess(false);
                navigate("/login");
              }, 1000);
            } else {
              alertMessage = resData;
            }

            setAlertMessage(alertMessage);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function registerFormValidation() {
    setUserNameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (userName === "") {
      setUserNameError("Please Enter the Username.");
    } else if (password === "") {
      setPasswordError("Please Enter the Password.");
    } else if (password.length < 8) {
      setPasswordError("Password must be an 8 characters.");
    } else if (confirmPassword === "") {
      setConfirmPasswordError("Please Enter the Confirm Password.");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Password does not match!");
    } else {
      return true;
    }
  }

  return (
    <div className="Register">
      <Header />
      <div className="Register__container">
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
          <InputError errorMessage={passwordError} />

          <Input
            placeHolder="Confirm Password"
            Type="password"
            inputName="confirmPassword"
            iconClass="fa-solid fa-key"
            handleChange={confirmPasswordHandleChange}
            inputValue={confirmPassword}
          />
          <InputError errorMessage={confirmPasswordError} />
          <br />
          <HeroButton
            redirectTo="/register"
            buttonValue="Register"
            iconClass="fa-solid fa-angle-right"
            handleClick={handleClick}
          />
        </form>
      </div>
      <SuccessAlert
        success={regSuccess}
        setSuccess={setRegSuccess}
        successMessage="New user is successfully Registered!"
      />
    </div>
  );
}

export default Register;
