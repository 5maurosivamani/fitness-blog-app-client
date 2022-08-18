import React from "react";
import "./Home.css";
import { Header } from "../../components";

import fitnessMan from "../../images/fitness_PNG191.png";
import HeroButton from "../../components/heroButton/HeroButton";

function Home() {
  return (
    <div className="Home">
      <img src={fitnessMan} alt="fitness man" />
      <div className="Home__texture">
        <Header />
        <div className="Home__content">
          <div className="Home__content-text">
            <h1>MAKE YOUR</h1>
            <h1>BODY SHAPE</h1>
            <p>If you are a beginner, don’t worry.</p>

            <HeroButton
              redirectTo="/blogs"
              buttonValue="Get Started"
              iconClass="fa-solid fa-angles-right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
