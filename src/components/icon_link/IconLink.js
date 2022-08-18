import React from "react";
import "./IconLink.css";
import { Link } from "react-router-dom";

function IconLink({ redirectLink, linkText, linkIcon, handleClick }) {
  return (
    <Link className="IconLink" to={redirectLink} onClick={handleClick}>
      <i className={linkIcon}></i>
      {linkText}
    </Link>
  );
}

export default IconLink;
