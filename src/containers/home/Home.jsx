import React from "react";
import { Header, HeroButton } from "../../components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "./Home.css";
import { useEffect } from "react";

function Home() {
  return (
    <div className="Home">
      <Header />
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        centerMode={false}
        emulateTouch={true}
        showArrows={true}
        showThumbs={false}
        stopOnHover={true}
        swipeable={false}
        useKeyboardArrows={true}
      >
        <div>
          <div className="img"></div>
          <p className="legend">Strength</p>
        </div>
        <div>
          <div className="img"></div>
          <p className="legend">Flexible</p>
        </div>
        <div>
          <div className="img"></div>
          <p className="legend">Start now</p>
        </div>
      </Carousel>

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
  );
}

export default Home;
