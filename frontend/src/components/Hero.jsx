import React from "react";


function Hero() {
  return (
    <section className="hero">
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="herovideo.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1>Build Your Future with Confidence</h1>
        <p>Empowering innovation with cutting-edge web technologies.</p>
        <button>Get Started</button>
      </div>
    </section>
  );
}

export default Hero;
