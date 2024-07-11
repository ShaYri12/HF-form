"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/steptwo.css";
import "../styles/form.css";
import StepTwoCard from "./StepTwoCard";

const StepTwo = ({ prevStep, nextStep, handleChange, values, cartitem2 }) => {
  const { t } = useTranslation();
  const [cart2, setCart2] = useState([]);

  const addToCart = (item) => {
    setCart2(item);
    console.log("cart2", cart2);
    cartitem2(item);
    console.log("Cart:", item); // Log the updated cart for debugging
    handleChange(item);
  };

  const cardsData = t("stepTwo.cards", { returnObjects: true });

  return (
    <div className="formContainer step-form">
      <div className="title-info">
        <h2>{t("stepTwo.title")}</h2>
        <p>{t("stepTwo.description")}</p>
      </div>
      <div className="review-inline">
        <h3>{t("review.excellent")}</h3>
        <div className="stars">
          <img src="/assets/star.png" alt="star" />
          <img src="/assets/star.png" alt="star" />
          <img src="/assets/star.png" alt="star" />
          <img src="/assets/star.png" alt="star" />
          <img src="/assets/star.png" alt="star" />
        </div>
        <p className="reviews">
          712 <span>{t("review.reviewsOn")}</span>
        </p>
        <div className="trustpilot">
          <img src="/assets/star-trustpilot.svg" alt="trust" />{" "}
          <span>Trustpilot</span>
        </div>
      </div>
      {cardsData.map((card, index) => (
        <StepTwoCard
          key={index}
          card={card}
          nextStep={nextStep}
          addToCart={addToCart}
        />
      ))}
      <button className="back-btn" onClick={prevStep}>
        <img src="/assets/arrow.svg" alt="arrow" /> {t("stepTwo.back")}
      </button>
    </div>
  );
};

export default StepTwo;
