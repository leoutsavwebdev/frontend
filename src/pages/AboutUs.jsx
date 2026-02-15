import React from "react";
import SpiralBackground from "./SpiralBackground";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutus-page">
      <div className="aboutus-spiral-wrap">
        <SpiralBackground />
      </div>
      <h1 className="aboutus-title">About Us</h1>
      <div className="aboutus-container card-effect">
        <p>
          The <strong>LEO Club of CEG</strong> is a student body of the <strong>College of Engineering Guindy (CEG)</strong>, which endeavors to enhance the leadership aptitude of students by providing them with myriad opportunities and experiences aimed at their overall development.
        </p>
        <p>
          With its determined motto of <em>"Leadership, Experience, and Opportunity"</em>, the LEO Club of CEG is where students cherish every opportunity to hone their leadership and professional skills to mould themselves into responsible individuals.
        </p>
        <p>
          The club organizes various events that foster the spirit of social responsibility among students; the signature events aimed at community well-being and development are <strong>THULIR</strong> and <strong>VIDIYAL</strong>.
        </p>
        <p>
          The club has rendered its service to society by adopting <strong>SURYA NAGAR</strong>, a slum area near Kotturpuram, Chennai. Free tuitions are given to the children of SURYA NAGAR to help fulfil their dream of acing the <strong>UPSC Civil Services Examinations</strong>.
        </p>
        <p>
          The most notable program of the club is the <strong>Free UPSC Coaching Classes</strong> conducted for the students of CEG in association with <strong>ARAM IAS ACADEMY</strong>; the count of students attending these classes has been increasing annually.
        </p>
        <p>
          The LEO Club of CEG, under the patronage of its parent club, <strong>Lions Club of South Madras</strong>, is one of the oldest functioning clubs of the college. The Lions Club of South Madras is a social, non-profit organization aimed at meeting the needs of communities.
        </p>
        <p>
          With indispensable support and encouragement from the parent club, the LEO Club of CEG conducts a multitude of events, including <strong>LEO UTSAV</strong>—a fest of cultural and extracurricular fun activities that raises funds to donate to people or organizations seeking aid in unprecedented times of emergency and distress.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
