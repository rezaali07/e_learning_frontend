import React from "react";
import { Link } from "react-router-dom";
import live_logo_gif from "../Assets/wallpaper/live_logo.gif"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import "./Footer.css";
import footerVideo from '../Assets/wallpaper/footer_wall.mp4';

const Footer = () => {
  return (
    <footer className="footer">
      <video autoPlay loop muted>
        <source src={footerVideo} type="video/mp4" />
      </video>
      <div className="container">
        <div className="row">
          {/* Footer Logo and Social Links */}
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="footer-logo">
              <Link to="/">
                <img src={live_logo_gif} alt="Logo" className="logo" />
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="footer-links">
              <h5>Company</h5>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/">Features</Link></li>
                <li><Link to="/">Works</Link></li>
                <li><Link to="/">Career</Link></li>
              </ul>
            </div>
          </div>

          {/* Help Links */}
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="footer-links">
              <h5>Help</h5>
              <ul>
                <li><Link to="/contact">Customer Support</Link></li>
                <li><Link to="/">Terms & Conditions</Link></li>
                <li><Link to="/">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* FAQ Links */}
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="footer-links">
              <h5>FAQ</h5>
              <ul>
                <li><Link to="/">Account</Link></li>
                <li><Link to="/">Payments</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="copyright">
          <h2>&copy; 2025,  made possible <FontAwesomeIcon icon={faHeart} className="animated-heart" /> with the support of Mr. Manoj Shrestha sir</h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;