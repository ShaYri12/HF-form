"use client";
import "../styles/suppliments.css";
import "../styles/form.css";
import SuppimentsCard from "./SupplimentsCard";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";

const Suppliments = ({
  prevStep,
  nextStep,
  handleChange,
  values,
  setCartItem,
  cartitem,
}) => {
  const [cart, setCart] = useState([]);
  const { t } = useTranslation();

  const addToCart = (item) => {
    setCart([item]);
    setCartItem([item]);
    console.log("Cart:", [item]);
    handleChange(item);
  };

  const cardsData = t("stepThree.products", { returnObjects: true });

  return (
    <div className="formContainer step-form">
      <div className="title-info">
        <h2>{t("stepThree.title")}</h2>
      </div>
      {cardsData.map((card, index) => (
        <SuppimentsCard
          key={index}
          card={card}
          addToCart={addToCart}
          nextStep={nextStep}
        />
      ))}

      <div className="btn-group btn-group-stepthree">
        <button className="back-btn back-btn-stepthree" onClick={prevStep}>
          <img src="/assets/arrow.svg" alt="arrow" /> {t("stepThree.back")}
        </button>
        <div className="forward-btns">
          <button className="long-btn long-btn-stepthree" onClick={nextStep}>
            {t("stepThree.skip")}
          </button>
        </div>
      </div>

      <div className="review-inline review-md review-stepthree">
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
          <img src="/assets/star-trustpilot.svg" alt="trust" />
          <span>Trustpilot</span>
        </div>
      </div>

      <div className="review review-sm">
        <h3>{t("review.excellent")}</h3>
        <div className="stars">
          <img src="/assets/star.png" alt="star" />
          <img src="/assets/star.png" alt="star" />
          <img src="/assets/star.png" alt="star" />
          <img src="/assets/star.png" alt="star" />
          <img src="/assets/star.png" alt="star" />
        </div>
        <p>
          {t("review.basedOn")} <b>712 {t("review.reviews")}</b>
        </p>
        <div className="trustpilot">
          <img src="/assets/star-trustpilot.svg" alt="trust" /> Trustpilot
        </div>
      </div>
    </div>
  );
};

export default Suppliments;
