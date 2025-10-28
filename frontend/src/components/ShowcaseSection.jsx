import React from "react";


function ShowcaseSection() {
  const projects = [
    {
      title: "Modern Dashboard",
      desc: "A responsive admin panel built with React, Tailwind, and Chart.js for live analytics.",
      img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80",
      link: "#",
    },
    {
      title: "E-Commerce Platform",
      desc: "Full-stack MERN e-commerce app with authentication, payments, and admin control.",
      img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80",
      link: "#",
    },
  
  ];

  return (
    <section className="showcase-section" id="projects">
      <h2 className="showcase-title">Our Work</h2>
      <p className="showcase-subtitle">
        Some of our recent projects that blend creativity and performance.
      </p>

      <div className="showcase-grid">
        {projects.map((project, index) => (
          <div className="showcase-card" key={index}>
            <div className="showcase-image">
              <img src={project.img} alt={project.title} />
            </div>
            <div className="showcase-content">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <a href={project.link} className="showcase-btn">
                View Project →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ShowcaseSection;
