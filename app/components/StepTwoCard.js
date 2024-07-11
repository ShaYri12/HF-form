"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const StepTwoCard = ({ card, nextStep, addToCart }) => {
  const { t } = useTranslation(); // Hook to access translations
  const [quantity, setQuantity] = useState(1);
  const item = card;

  const handleAddToCart = () => {
    if (quantity > 0) {
      const item = { ...card, quantity };

      addToCart(item); // Notify parent component (StepThree) about the added item
      nextStep(); // Proceed to the next step
    } else {
      console.log("Quantity should be greater than zero to add to cart.");
      // Optionally, you could display an error message or alert the user.
    }
  };

  return (
    <div className="medication">
      <div className="card-header">
        <h3>{item.title}</h3>
        <span>
          {Array.from({ length: item.star }).map((_, index) => (
            <img key={index} src="assets/star.svg" alt="star" />
          ))}
        </span>
      </div>
      <div className="card">
        <div className="card-top">
          <div className="card-img card-medicine-img">
            <img
              src={item.imgSrc}
              alt={item.title}
              width={"100%"}
              height={"100%"}
            />
          </div>
          <div className="card-title-price">
            <span>{item.label}</span>
            <h3>{item.stock}</h3>
            <p className="title-desc">{item.titleDesc}</p>
            <span className="price-type">
              <div>{item.type}</div>
              <div className="price">{item.price}</div>
            </span>
          </div>
        </div>
        <div className="card-info">
          <div className="descriptions">
            {item.descriptions.map((description, index) => (
              <span key={index} className="lose-upto">
                <img src="/assets/checkmark.svg" alt="checkmark" />
                <p className="lose">{description}</p>
              </span>
            ))}
          </div>

          {item.features.map((feature, index) => (
            <span key={index}>
              <img src="/assets/checkmark.svg" alt="checkmark" />
              <p>{feature}</p>
            </span>
          ))}
        </div>
        <div className="btn-group">
          <button className="long-btn" onClick={handleAddToCart}>
            {t("stepTwo.startLosingWeight")} {/* Translated button text */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepTwoCard;
