import React from "react";


function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ayesha Khan",
      role: "CEO, PixelCraft Studio",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      quote:
        "Their team transformed our outdated website into a stunning, responsive platform. The performance and design are top-notch!",
    },
    {
      name: "Ali Raza",
      role: "Founder, Techify",
      img: "https://randomuser.me/api/portraits/men/33.jpg",
      quote:
        "Incredible attention to detail. From planning to final delivery, everything was handled with professionalism and creativity.",
    },
    {
      name: "Sara Ahmed",
      role: "Marketing Lead, NovaTech",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      quote:
        "Their web app helped us automate internal processes and improved our team's productivity by 40%. Highly recommend!",
    },
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <h2 className="testimonials-title">What Our Clients Say</h2>
      <p className="testimonials-subtitle">
        Don’t just take our word for it — hear it from the people we’ve worked with.
      </p>

      <div className="testimonials-grid">
        {testimonials.map((t, index) => (
          <div className="testimonial-card" key={index}>
            <div className="testimonial-header">
              <img src={t.img} alt={t.name} className="testimonial-img" />
              <div>
                <h3>{t.name}</h3>
                <p>{t.role}</p>
              </div>
            </div>
            <p className="testimonial-quote">“{t.quote}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TestimonialsSection;
