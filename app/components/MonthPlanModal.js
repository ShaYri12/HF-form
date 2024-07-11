import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { currencyToNumber } from "../utils/currencyUtils";

const MonthPlanModal = ({ isOpen, onClose, item, handleMonthPlanChange }) => {
  const { t } = useTranslation();

  // State to manage pending changes
  const [pendingChanges, setPendingChanges] = useState({
    plan: item.plans.title,
    price: item.plans.price,
    type: item.plans.type,
    code: item.plans.code,
  });

  // Function to handle visual change of selected plan
  const handleChange = (newPlan, newPrice, newType, newCode) => {
    setPendingChanges({
      title: newPlan,
      price: newPrice,
      type: newType,
      code: newCode,
    });
  };

  // Function to apply confirmed plan change
  const handleConfirm = () => {
    handleMonthPlanChange(item, pendingChanges);
    onClose();
  };

  // Close the modal without applying changes
  const handleCancel = () => {
    setPendingChanges({
      title: item.plans.title,
      price: item.plans.price,
      type: item.plans.type,
      code: item.plans.code,
    });
    onClose();
  };

  // Render the modal content
  if (!isOpen) return null;

  const plans = item.plans || [];

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="label-info">
          <h2>{t("planSelection.title")}</h2>
          <p>{t("planSelection.description")}</p>
        </div>
        <form className="input-form">
          <div className="plan-select">
            {plans.map((plan, index) => {
              const planPriceNumber = currencyToNumber(plan.price);
              const totalPlanPrice =
                plan.code === "3M" ? planPriceNumber * 3 : planPriceNumber;

              return (
                <>
                  <div
                    key={index}
                    className="plan-option"
                    onClick={() =>
                      handleChange(plan.title, plan.price, plan.type, plan.code)
                    }
                  >
                    <input
                      type="radio"
                      id={plan.code}
                      name="plan"
                      checked={pendingChanges.title === plan.title}
                      onChange={() => {}}
                    />
                    <label className="plan-selection-text" htmlFor={plan.code}>
                      <span className="month">{plan.title}</span>
                      <div className="price">
                        {plan.originalPrice && (
                          <span className="original-price">
                            {plan.originalPrice}
                          </span>
                        )}
                        <span>
                          {plan.price} {t("planSelection.month")}
                        </span>
                      </div>
                    </label>
                  </div>
                  {plan.originalPrice && (
                    <div className="price-total">
                      <span>
                        {t("planSelection.note")} {plan.price},{" "}
                        {t("planSelection.billed")} {totalPlanPrice}
                      </span>
                    </div>
                  )}
                </>
              );
            })}
          </div>
          <div className="btn-group">
            <button className="btn-cancel" onClick={handleCancel}>
              {t("stepTwelve.cancel")}
            </button>
            <button className="save-btn" type="button" onClick={handleConfirm}>
              {t("stepTwelve.confirm")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MonthPlanModal;
