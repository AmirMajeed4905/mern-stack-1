import React from "react";

import { FaRocket, FaMobileAlt, FaCode, FaPalette } from "react-icons/fa";

function Features() {
  const featureList = [
    {
      icon: <FaRocket />,
      title: "Fast Performance",
      desc: "Optimized code and modern technologies ensure your website loads instantly."
    },
    {
      icon: <FaMobileAlt />,
      title: "Responsive Design",
      desc: "Looks amazing on any device, from desktops to mobiles."
    },
    {
      icon: <FaCode />,
      title: "Clean Code",
      desc: "Well-structured, maintainable code following industry standards."
    },
    {
      icon: <FaPalette />,
      title: "Modern UI/UX",
      desc: "Beautiful, modern designs that attract and engage users."
    },
     {
      icon: <FaPalette />,
      title: "Modern UI/UX",
      desc: "Beautiful, modern designs that attract and engage users."
    }
  ];

  return (
    <section className="features-section">
      <h2 className="features-title">Our Features</h2>
      <div className="features-container">
        {featureList.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
