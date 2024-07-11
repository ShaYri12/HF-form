import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/plan-selection.css";
import "../styles/form.css";
import Review from "./Review";
import { currencyToNumber } from "../utils/currencyUtils";

const PlanSelection = ({
  nextStep,
  prevStep,
  handleChange,
  values,
  cartitem2,
}) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    plan: values.plan || "",
    price: values.price || "",
    pounds: values.pounds || "",
    stepTwo: values.stepTwo || {},
  });

  const [error, setError] = useState("");
  const [planSelected, setPlanSelected] = useState(false);

  const handlePlanSelection = (plan) => {
    const cleanedPrice = plan.price.replace(/[^$0-9]/g, "");
    const newFormData = {
      ...formData,
      plan: plan.title,
      planCode: plan.code,
      price: cleanedPrice,
      pounds: plan.pounds,
      stepTwo: {
        ...formData.stepTwo,
        price: cleanedPrice,
        description: plan.description,
        monthPlan: plan.title,
        plan: plan,
      },
    };
    setFormData(newFormData);
    console.log("Selected Plan:", newFormData.plan); // Check selected plan
    setError(""); // Clear any existing error message
    handleChange("stepTwo")(newFormData.stepTwo);
    handleChange("planSelection")(newFormData);
    let numPrice = parseInt(plan.price.replace(/[$,]/g, ""));
    let changedPrice = numPrice;
    let changedType = "One Time";

    if (plan.code == "3M") {
      changedPrice = numPrice * 3;
      changedType = "Subscription";
    }
    handleChange("order")({
      ...values.order,
      Type: changedType,
      TotalAmount: changedPrice,
    });
    cartitem2({ ...newFormData.stepTwo }); // Update cart2
    nextStep(); // Proceed to the next step
  };

  const handleContinue = () => {
    if (!planSelected) {
      setError(t("error.selectError")); // Set error message if no plan is selected
    } else {
      nextStep(); // Proceed to the next step if a plan is selected
    }
  };

  // Assuming stepTwo.plans is available in values
  const plans = values.stepTwo.plans || [];

  return (
    <div className="formContainer step-form">
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
                  onClick={() => handlePlanSelection(plan)}
                >
                  <input
                    type="radio"
                    id={plan.code}
                    name="plan"
                    value={plan.title}
                    checked={formData.plan === plan.title}
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
                      {t("planSelection.note")} {plan.price}
                      {", "}
                      {t("planSelection.billed")} {totalPlanPrice}{" "}
                    </span>
                  </div>
                )}
              </>
            );
          })}
        </div>
        {error && <span className="error">{error}</span>}
        <div className="plan">
          <div className="btn-group btn-group-stepthree">
            <button
              type="button"
              className="back-btn back-btn-stepthree"
              onClick={prevStep}
            >
              <img src="/assets/arrow.svg" alt="arrow" />{" "}
              {t("planSelection.back")}
            </button>
            <button
              type="button"
              className="long-btn long-btn-stepthree"
              onClick={handleContinue}
            >
              {t("planSelection.continueJourney")}
            </button>
          </div>
        </div>
      </form>
      <Review />
    </div>
  );
};

export default PlanSelection;
