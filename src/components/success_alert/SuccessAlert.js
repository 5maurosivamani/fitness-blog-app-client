import { React, useState } from "react";
import "./SuccessAlert.css";
import successCircle from "../../images/done-icon.png";

function SuccessAlert({ success, setSuccess, successMessage }) {
  return (
    <div
      className="success__alert"
      style={success === true ? { display: "block" } : { display: "none" }}
      onClick={() => {
        setSuccess(false);
      }}
    >
      <div className="success__alert-container">
        <div className="success__alert-container-circle">
          <img src={successCircle} alt="success-circle" />
        </div>
        <h3>{successMessage}</h3>
      </div>
    </div>
  );
}

export default SuccessAlert;
