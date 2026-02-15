import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppData } from "../context/AppData";
import Footer from "../components/Footer";
import Section1 from "../components/Section1";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();
  const { events } = useAppData();
  const [featuredList, setFeaturedList] = useState([]);
  const [mouseSpot, setMouseSpot] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const open = (events || []).filter(
      (e) => !e.status || e.status === "open" || e.status === "ongoing"
    );
    setFeaturedList(open.slice(0, 2));
  }, [events]);

  useEffect(() => {
    const canvas = document.getElementById("leo-particle-canvas");
    const section = document.querySelector(".leo-typewriter-section");
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray = [];
    const numberOfParticles = 100;

    function resizeCanvas() {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = "rgba(0, 170, 255, 0.8)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handleHeroMouseMove = (e) => {
    const section = e.currentTarget;
    const rect = section.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMouseSpot({ x, y });
  };

  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section
        className="leo-typewriter-section hero-lighting"
        onMouseMove={handleHeroMouseMove}
      >
        <div
          className="hero-spotlight"
          style={{
            background: `radial-gradient(circle 180px at ${
              mouseSpot.x * 100
            }% ${mouseSpot.y * 100}%, rgba(0,170,255,0.25), transparent 60%)`,
          }}
          aria-hidden
        />
        <canvas id="leo-particle-canvas"></canvas>

        <Link to="/login" className="home-login-link">
          Login
        </Link>

        <div className="leo-typewriter">
          <h1 className="hero-neon-title">LEO Utsav'26</h1>
          <p className="leo-subtitle">
            Leo Club of CEG
            </p>
            <p className="leo-subtitle">
            Leadership Experience Opportunity
          </p>
        </div>
      </section>

      {/* ✅ SECTION1 ADDED AS SECOND CARD */}
      <section className="section1-wrapper">
        <Section1 />
      </section>
      {/* PURPOSE SECTION - second card */} 
      <section className="purpose-section">
  <div className="purpose-content">
    <h1>Empowering Change Through Innovation</h1>

    <br />

    <h4>
      <span className="glow-line">
        "Celebrate. Compete. Contribute."
      </span>
    </h4>

    <br />

    <p>
      <strong>LEO UTSAV</strong> is more than just an event — it is a vibrant 
      celebration of talent, creativity, and purpose. Hosted by the{" "}
      <strong>LEO Club of CEG</strong>, the student body of{" "}
      <strong>College of Engineering, Guindy</strong>, UTSAV brings together 
      students from across campuses to participate, perform, and make an impact.
    </p>

    <br />

    <p>
      From exciting competitions and cultural showcases to meaningful 
      initiatives, UTSAV blends celebration with contribution. It is a space 
      where passion meets purpose and every moment adds to a larger cause.
    </p>

    <br />

    <p>
      <strong>Event Schedule:</strong><br />
        <span className="schedule-date">Feb 16 & 17 – 4:00 PM to 7:30 PM</span><br />
  <span className="schedule-date">Feb 18 – 9:00 AM to 7:30 PM</span>
    </p>
  </div>
</section>

      {/* FEATURED EVENTS */}
      <section className="featured-events-section">
        <h2 className="featured-title">Featured Events</h2>
        <p className="featured-subtitle">
          Don&apos;t miss out on these exciting events! Register now to secure your spot.
        </p>

        <div className="events-grid">
          {featuredList.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-tag">
                {event.category || "Event"}
              </div>

              <h3>{event.title}</h3>
              <p>{event.description}</p>

              <div className="event-details">
                <span>📅 {event.date} • {event.time}</span>
                <span>📍 {event.venue}</span>
              </div>

              <div className="event-footer">
                <span
                  className={event.cost === 0 ? "price free" : "price"}
                >
                  {event.cost === 0
                    ? "Free"
                    : `₹ ${event.cost ?? 10}`}
                </span>

                <button
                  type="button"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="home-explore-wrap">
          <Link to="/events" className="home-explore-btn">
            Explore Events
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
