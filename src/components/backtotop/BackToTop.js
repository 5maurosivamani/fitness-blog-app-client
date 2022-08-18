import { React, useState } from "react";
import "./BackToTop.css";

function BackToTop() {
  const [isVisbile, setIsVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled >= 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div
      className="back-to-top"
      style={{ display: isVisbile ? "flex" : "none" }}
      onClick={scollToTop}
    >
      <i className="fa-solid fa-angle-up"></i>
    </div>
  );
}

export default BackToTop;
