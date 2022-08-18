import React from "react";
import "./InputError.css";

function InputError({ errorMessage }) {
  return <p className="input-error">{errorMessage}</p>;
}

export default InputError;
