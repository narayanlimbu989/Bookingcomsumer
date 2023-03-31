import React from "react";
import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import d1 from "./img/d1.png";
import d2 from "./img/d2.png";

const Footer = () => {
  const link = useNavigate();
  return (
    <>
      <footer className="footer-top py-4">
        <div className="container-xxl">
          <div className="row d-flex justify-content-center">
            <div className="col-3">
              <h5>contact us</h5>
              <div className="div">
                <span>Booknify</span>
                <span>Kadhaghari,Kathmandu</span>
                <span>+977 9818463950</span>
                <span>booknify@gmail.com</span>
                <div className="links d-flex gap-2 mt-2">
                  <span>
                    <BsFacebook className="link" />
                  </span>
                  <span>
                    <BsInstagram className="link" />
                  </span>
                  <span>
                    <BsLinkedin className="link" />
                  </span>
                  <span>
                    <BsTwitter className="link" />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-2">
              <h5>Information</h5>
              <div className="div">
                <span>Privacy Policy</span>
                <span>Refund Policy</span>
                <span>Shipping Policy</span>
                <span>Terms of Service</span>
              </div>
            </div>
            <div className="col-2">
              <h5>Account</h5>
              <div className="div">
                <span>Search</span>
                <span>About Us</span>
                <span>FAQ</span>
                <span>Contact</span>
              </div>
            </div>
            <div className="col-2">
              <h5>Quick Links</h5>
              <div className="div">
                <span onClick={() => link("/search/type=Hotels")}>Hotels</span>
                <span onClick={() => link("/search/type=Resorts")}>
                  Resorts
                </span>
                <span onClick={() => link("/search/type=Villas")}>Villas</span>
                <span onClick={() => link("/search/type=Apartments")}>
                  Apartments
                </span>
              </div>
            </div>
            <div className="col-3">
              <h5>Our App</h5>
              <div className="div">
                <span>Download our app & get upto 20%</span>
                <span>on your First Order</span>
                <div className="appsdownload">
                  <div className="img">
                    <img src={d1} alt="download" />
                  </div>
                  <div className="img">
                    <img src={d2} alt="download" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer-bottom py-4">
          <div className="container-xxl  d-flex align-items-center justify-content-center">
            <span>© 1996-2023, Booknify, Inc. or its affiliates</span>
          </div>
        </footer>
      </footer>
    </>
  );
};

export default Footer;
