import React from "react";
import { Link } from "react-router-dom";
import "./HeroButton.css";

function HeroButton({
  buttonValue,
  redirectTo,
  iconClass,
  handleClick,
  float,
}) {
  return (
    <Link
      className="Blog__button"
      to={redirectTo}
      onClick={handleClick}
      style={{ float: float }}
    >
      {buttonValue} &nbsp;
      <i className={iconClass}></i>
    </Link>
  );
}

export default HeroButton;
