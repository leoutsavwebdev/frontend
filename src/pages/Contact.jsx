import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact Us</h1>
      <div className="contact-container">
        {/* Map */}
        <div className="map-container">
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

        {/* Details */}
        <div className="contact-details">
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:leoclub.hr@gmail.com">leoclub.hr@gmail.com</a>
          </p>
          <p>
            <strong>Address:</strong><br />
            LEO Club of CEG<br />
            College of Engineering Guindy<br />
            Anna University<br />
            Chennai – 600025
          </p>
          <p>To contribute to our service, contact:</p>
          <p><strong>LEO KAVIYA S</strong></p>
          <p>96001 03203</p>

          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/145/145802.png" alt="Facebook" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;