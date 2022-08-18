import React from "react";
import "./Contact.css";
import { Header, GreyboxDesign } from "../../components";

function Contact() {
  return (
    <div className="Contact">
      <Header />
      <div className="Contact__container">
        <div className="Contact__container-box">
          <GreyboxDesign />
          <div className="Contact__container-box_content">
            <h1 className="page__heading">Contact</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
