import React from "react";
import "./Input.css";

function Input({
  placeHolder,
  Type,
  inputName,
  iconClass,
  handleChange,
  inputValue,
}) {
  return (
    <div className="Login__input-group">
      <input
        type={Type}
        name={inputName}
        className="Login__input"
        placeholder={placeHolder}
        onChange={handleChange}
        value={inputValue}
      />
      <i className={iconClass}></i>
    </div>
  );
}

export default Input;
