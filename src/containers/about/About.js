import React from "react";
import "./About.css";
import { Header } from "../../components";

function About() {
  return (
    <div class="About">
      <Header activeLink="about" />
      <div className="container my-3 px-0 bg-light rounded">
        <div class="card">
          <div class="card-header">
            <h3 className="text-success">About</h3>
          </div>
          <div class="card-body">
            <div className="profile rounded-pill mx-auto my-3" />
            <h5 class="card-title text-center">HI THERE!</h5>

            <h2 className="text-center mb-3">
              I'M <span className="text-success">Sivamani.</span>
            </h2>
            <p
              className="card-text lh-5 mx-auto col-sm-10 col-md-8 col-lg-7 "
              style={{ textAlign: "justify" }}
            >
              I'm very passionate about technology specially about Web
              Technology. I have two year of experience in full stack web
              developement using Html, Js, Css, Php, Mysql, Bootstrap, Jquery
              and git in Auro Infotech. I learned new Technologies like Node js,
              Mongodb, Express, React & Redux and looking job for MERN Stack
              Developer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
