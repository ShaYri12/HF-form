import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import "../styles/testimonial.css";

const Testimonial = () => {
  const { t } = useTranslation(); // Initialize useTranslation hook

  const testimonialData = t("testimonial.testimonials", {
    returnObjects: true,
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex(
      currentIndex > 0 ? currentIndex - 1 : testimonialData.length - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentIndex(
      currentIndex < testimonialData.length - 1 ? currentIndex + 1 : 0
    );
  };

  const currentTestimonial = testimonialData[currentIndex];

  return (
    <div className="testimonialContainer">
      <div className="testimonialHeader">
        <h2>{t("testimonial.realStories")}</h2> {/* Translate the header */}
        <div className="testimonialNavigation">
          <button
            id="prev"
            className="navButton textimonial-prev"
            onClick={prevTestimonial}
          >
            <img src="/assets/arrow.svg" alt="" />
          </button>
          <button
            id="next"
            className="navButton textimonial-next"
            onClick={nextTestimonial}
          >
            <img src="/assets/arrow.svg" alt="" />
          </button>
        </div>
      </div>
      <div id="testimonial" className="testimonialContent">
        <div className="ratingSource">
          <div className="rating">
            {[...Array(parseInt(currentTestimonial.rating))].map((_, i) => (
              <img
                key={i}
                src="/assets/star-white.svg"
                alt="Star"
                className="ratingStars"
              />
            ))}
          </div>
          <span>{currentTestimonial.source}</span> {/* Translate the source */}
        </div>
        <p className="testimonialText">{currentTestimonial.text}</p>
        <p className="testimonialAuthor">{currentTestimonial.author}</p>
      </div>

      <div className="testimonialNavigation testimonialNavigation-sm">
        <button
          id="prev"
          className="navButton textimonial-prev"
          onClick={prevTestimonial}
        >
          <img src="/assets/arrow.svg" alt="" />
        </button>
        <button
          id="next"
          className="navButton textimonial-next"
          onClick={nextTestimonial}
        >
          <img src="/assets/arrow.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Testimonial;
