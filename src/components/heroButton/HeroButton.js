import React from "react";
import { Link } from "react-router-dom";
import "./HeroButton.css";
import Button from "@mui/material/Button";

function HeroButton({
  buttonValue,
  redirectTo,
  icon,
  handleClick,
  float,
  bootstrapClass,
  start,
}) {
  const iconProps = {};

  if (start) {
    iconProps.startIcon = icon;
  } else {
    iconProps.endIcon = icon;
  }
  return (
    // <Link
    //   className="Blog__button"
    //   to={redirectTo}
    //   onClick={handleClick}
    //   style={{ float: float }}
    // >
    //   {buttonValue} &nbsp;
    //   <i className={iconClass}></i>
    // </Link>

    <Link
      to={redirectTo}
      onClick={handleClick}
      style={{ textDecoration: "none", float: float }}
    >
      <Button
        variant="outlined"
        style={{
          borderColor: "rgb(1, 138, 129)",
          color: "rgb(1, 138, 129)",
        }}
        {...iconProps}
        className={`mr-2 mt-2 ${bootstrapClass}`}
      >
        {buttonValue}
      </Button>
    </Link>
  );
}

export default HeroButton;
