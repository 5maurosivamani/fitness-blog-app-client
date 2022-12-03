import React from "react";
import "./Contact.css";
import { Header } from "../../components";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div class="Contact">
      <Header activeLink="contact" />
      <div className="container my-3 px-0 bg-light rounded">
        <div class="card">
          <div class="card-header">
            <h3 className="text-success">Contact</h3>
          </div>
          <div class="card-body">
            <div className="container py-3">
              <div className=" mx-auto ps-md-5">
                <ul className="list-unstyled">
                  <li className="d-flex">
                    <div className="icon me-2">
                      <i class="bi bi-telephone-fill"></i>
                    </div>
                    8098668053
                  </li>
                  <li className="d-flex">
                    <div className="icon me-2">
                      <i class="bi bi-envelope-fill"></i>
                    </div>
                    5maurosivamani@gmail.com
                  </li>

                  <li className="d-flex">
                    <div className="icon me-2">
                      <i class="bi bi-linkedin"></i>
                    </div>
                    <Link
                      to="https://www.linkedin.com/in/sivamani-n-b1034623b/"
                      target="_blank"
                      className="text-wrap w-75"
                    >
                      https://www.linkedin.com/in/sivamani-n-b1034623b/
                    </Link>
                  </li>
                  <li className="d-flex">
                    <div className="icon me-2">
                      <i class="bi bi-github"></i>
                    </div>

                    <Link
                      to="https://github.com/5maurosivamani"
                      target="_blank"
                    >
                      https://github.com/5maurosivamani
                    </Link>
                  </li>
                  <li className="d-flex">
                    <div className="icon me-2">
                      <i class="bi bi-geo-alt-fill"></i>
                    </div>
                    Nagapattinam, Tamil Nadu.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
