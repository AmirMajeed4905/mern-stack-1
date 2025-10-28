import React, { useState } from "react";


const faqData = [
  {
    question: "How can I get started?",
    answer:
      "Simply sign up and explore our features. You can start using the platform instantly after creating your account.",
  },
  {
    question: "Is this service free to use?",
    answer:
      "We offer a free plan with limited features, and premium plans for advanced tools and integrations.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you can cancel or upgrade your plan anytime from your account settings without any hidden charges.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Absolutely. Our support team is available 24/7 via email and chat to assist you.",
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="heading">
        <h2>Frequently Asked Questions</h2>
        <p>Got questions? We’ve got answers to help you get started faster.</p>
      </div>

      <div className="faq-container">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <h4>
              {faq.question}
              <span>{activeIndex === index ? "−" : "+"}</span>
            </h4>
            {activeIndex === index && <p>{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
