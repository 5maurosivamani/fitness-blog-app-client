import React from "react";
import "./Loading.css";
// import Loader from "../../images/loader.gif";
import { TailSpin } from "react-loader-spinner";

function Loading() {
  return (
    <div className="Loading">
      {/* <img src={Loader} alt="" /> */}
      <TailSpin
        height="80"
        width="80"
        color="#fff"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loading;
