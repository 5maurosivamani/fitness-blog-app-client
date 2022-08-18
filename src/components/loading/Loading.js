import React from "react";
import "./Loading.css";
import Loader from "../../images/loader.gif";

function Loading() {
  return (
    <div className="Loading">
      <img src={Loader} alt="" />
    </div>
  );
}

export default Loading;
