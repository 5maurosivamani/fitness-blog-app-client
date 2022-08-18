import React from "react";
import "./About.css";
import { Header, GreyboxDesign } from "../../components";

function About() {
  return (
    <div className="About">
      <Header />
      <div className="About__container">
        <div className="About__container-box">
          <GreyboxDesign />
          <div className="About__container-box_content">
            <h1 className="page__heading">About</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
