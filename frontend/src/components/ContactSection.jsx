import React from "react";


function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <h2 className="contact-title">Get in Touch</h2>
      <p className="contact-subtitle">
        Have a project in mind? Let’s connect and bring your vision to life.
      </p>

      <form className="contact-form">
        <div className="form-group">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
        </div>
        <textarea placeholder="Your Message" rows="6" required></textarea>
        <button type="submit" className="contact-btn">Send Message</button>
      </form>
    </section>
  );
}

export default ContactSection;
