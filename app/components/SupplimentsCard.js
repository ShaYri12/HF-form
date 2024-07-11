"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const SupplimentsCard = ({ card, addToCart, nextStep }) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [isClaimedFree, setIsClaimedFree] = useState(false);

  const handleAddToCart = () => {
    if (quantity > 0) {
      const item = {
        ...card,
        price: isClaimedFree ? 0 : card.price,
        quantity: quantity,
      };
      addToCart(item);
      nextStep();
    } else {
      console.log("Quantity should be greater than zero to add to cart.");
    }
  };

  const handleClaimFree = (e) => {
    e.stopPropagation();
    setIsClaimedFree(true);
    handleAddToCart();
  };

  return (
    <div className="card card-suppliment" onClick={handleAddToCart}>
      <div className="card-top">
        <div className="card-img supplement-img">
          <img className="object-cover" src={card.imgSrc} alt={card.title} />
        </div>
        {card.price == "$0" && (
          <button className="claim-free" onClick={handleClaimFree}>
            {t("stepThree.claimGift")}
          </button>
        )}
        <div className="card-title-price title-price-stepthree">
          <h3>{card.title}</h3>
          <div className="price-desc">
            <h3 className="price-decrease">
              <span className="original-price">{card.originalPrice}</span>
              <span className={"changed-price"}>
                {card.price == "$0" && "Free"}
              </span>
            </h3>
            <p>{card.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplimentsCard;
