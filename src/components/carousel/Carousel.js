import React from "react";
import "./Carousel.css";
import { Link } from "react-router-dom";
import TouchAppIcon from "@mui/icons-material/TouchApp";

function Carousel() {
  return (
    <div>
      <div
        id="carouselSlider"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        {/* carousel Indicator  */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselSlider"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Strength"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselSlider"
            data-bs-slide-to="1"
            aria-label="Flexibility"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselSlider"
            data-bs-slide-to="2"
            aria-label="Start Now"
          ></button>
        </div>

        {/* Carousel caption */}

        <div
          className="carousel-caption  m-auto position-absolute"
          style={{ zIndex: "1" }}
        >
          <h2>Make your body shape </h2>
          <p>If you are a biggener, don't worry.</p>
          <Link type="button" className="btn btn-success mt-4" to="/blogs">
            Let's Go
            <TouchAppIcon />
          </Link>
        </div>

        {/* Carousel Inner  */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div
              className="d-block w-100 image"
              alt="Strength"
              data-bs-interval="10000"
            ></div>
          </div>
          <div className="carousel-item">
            <div
              className="d-block w-100 image"
              alt="Flexibility"
              data-bs-interval="10000"
            ></div>
          </div>
          <div className="carousel-item">
            <div
              className="d-block w-100 image"
              alt="Start Now"
              data-bs-interval="10000"
            ></div>
          </div>
        </div>

        {/* carousel control */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselSlider"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselSlider"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
