import React from 'react';
import './Footer.css';
import facebookIcon from "../assets/facebook.png";
import instagramIcon from "../assets/instagram.png";
import twitterIcon from "../assets/twitter.png";
const Footer = () => {
  return (
    <footer className="footer-section">
      {/* Top Layout: Left = Info, Right = Map */}
      <div className="footer-top">
        {/* Address + Contact + Socials */}
        <div className="footer-column info">
          <h4>Address</h4>
          <p>
            LEO Club of CEG<br />
            College of Engineering Guindy<br />
            Anna University<br />
            Chennai – 600025
          </p>

          <h4>Contact Us</h4>
          <p>leoclub.hr@gmail.com</p>

          <div className="footer-socials">
  <a href="https://www.facebook.com/LEOCEG/photos/?_rdr"><img src={facebookIcon} alt="Facebook" /></a>
  <a href="https://www.instagram.com/leoclubofceg/?hl=en"><img src={instagramIcon} alt="Instagram" /></a>
  <a href="https://x.com/leoclubofceg"><img src={twitterIcon} alt="Twitter" /></a>
</div>

        </div>

        {/* Map */}
        <div className="footer-column map">
          <iframe
            title="Leo club of CEG"
            src="https://maps.google.com/maps?q=CEG%20Square,%20Anna%20University&t=&z=17&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: "20px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* ✅ Centered Quick Links below both columns */}
      {/*<div className="footer-links-centered">
        <a href="/events">Events and Activities</a>
        <a href="/our-team">Our Team</a>
        <a href="/contact">Contact</a>
      </div>*/}

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <p>Created & Maintained by Tech Team @ LEO Club of CEG, 2025–2026</p>
        <p>© All Rights Reserved LEO Club of CEG @ 2021.</p>
      </div>
    </footer>
  );
};

export default Footer;