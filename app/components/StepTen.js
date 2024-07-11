"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/stepten.css";
import "../styles/form.css";
import "../styles/suppliments.css";
import Review from "./Review";
import MonthPlanModal from "./MonthPlanModal";
import ShippingAddressModal from "./ShippingAddressModal";
import BillingAddressModal from "./BillingAddressModal";
import PaymentModal from "./PaymentModal";

const StepTen = ({
  prevStep,
  handleChange,
  formValues,
  addSuppliment,
  cart,
  setCart,
  cart2,
  setCart2,
  addAddon,
  stateOptions,
  createAgain,
}) => {
  const { t } = useTranslation();

  const alphanumericPattern = /^[a-zA-Z0-9\s,'-]*$/;
  const alphabeticPattern = /^[a-zA-Z\s]*$/;
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const useFormInput = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (name) => (event) => {
      let { value } = event.target;
      if (name === "zipCode" || name === "billingZipCode") {
        value = value.replace(/\D/g, ""); // Remove non-numeric characters
      }
      setValues({
        ...values,
        [name]: value,
        errors: {
          ...values.errors,
          [name]: "",
        },
      });
    };

    const validateField = (name) => {
      switch (name) {
        case "streetAddress1":
          if (!values[name].trim()) {
            return t("error.streetAddressError");
          } else if (!alphanumericPattern.test(values[name])) {
            return t("error.textError");
          }
          break;
        case "streetAddress2":
          if (values[name].trim() && !alphanumericPattern.test(values[name])) {
            return t("error.textError");
          }
          break;
        case "city":
          if (!values[name].trim()) {
            return t("error.cityError");
          } else if (!alphabeticPattern.test(values[name])) {
            return t("error.textError");
          }
          break;
        case "state":
          if (!values[name].trim()) {
            return t("error.stateError");
          }
          break;
        case "zipCode":
          if (!values[name].trim()) {
            return t("error.zipCodeError");
          }
          break;
        case "billingStreetAddress1":
          if (!values[name].trim()) {
            return t("error.streetAddressError");
          } else if (!alphanumericPattern.test(values[name])) {
            return t("error.textError");
          }
          break;
        case "billingStreetAddress2":
          if (values[name].trim() && !alphanumericPattern.test(values[name])) {
            return t("error.textError");
          }
          break;
        case "billingCity":
          if (!values[name].trim()) {
            return t("error.cityError");
          } else if (!alphabeticPattern.test(values[name])) {
            return t("error.textError");
          }
          break;
        case "billingState":
          if (!values[name].trim()) {
            return t("error.stateError");
          }
          break;
        case "billingZipCode":
          if (!values[name].trim()) {
            return t("error.zipCodeError");
          }
          break;
        default:
          break;
      }
      return "";
    };

    const validateForm = () => {
      const errors = {};
      Object.keys(values).forEach((name) => {
        if (name !== "errors") {
          errors[name] = validateField(name);
        }
      });
      setValues({ ...values, errors });
      return Object.values(errors).every((error) => error === "");
    };

    const setToInitial = () => {
      setValues(initialValues);
    };

    return {
      values,
      handleChange,
      validateForm,
      setToInitial,
      validateField,
    };
  };

  const initialShippingAddress = useFormInput({
    streetAddress1: formValues.stepSix.streetAddress1 || "",
    streetAddress2: formValues.stepSix.streetAddress2 || "",
    city: formValues.stepSix.city || "",
    state: formValues.stepSix.state || "",
    zipCode: formValues.stepSix.zipCode || "",
    errors: {
      streetAddress1: "",
      streetAddress2: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const initialBillingAddress = useFormInput({
    billingStreetAddress1: formValues.stepSix.billingStreetAddress1 || "",
    billingStreetAddress2: formValues.stepSix.billingStreetAddress2 || "",
    billingCity: formValues.stepSix.billingCity || "",
    billingState: formValues.stepSix.billingState || "",
    billingZipCode: formValues.stepSix.billingZipCode || "",
    errors: {
      billingStreetAddress1: "",
      billingStreetAddress2: "",
      billingCity: "",
      billingState: "",
      billingZipCode: "",
    },
  });

  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [monthPlanModal, setMonthPlanModal] = useState(false);

  const handleShippingSubmit = (event) => {
    event.preventDefault();
    const isValid = initialShippingAddress.validateForm();
    if (isValid) {
      console.log("Shipping address saved:", initialShippingAddress.values);
      setIsShippingModalOpen(false);
      handleChange("stepSix")({
        ...formValues.stepSix,
        ...initialShippingAddress.values,
      });
    } else {
      console.log("Form contains errors. Cannot save address.");
    }
  };

  const handleBillingSubmit = (event) => {
    event.preventDefault();
    const isValid = initialBillingAddress.validateForm();
    if (isValid) {
      console.log("Billing address saved:", initialBillingAddress.values);
      setIsBillingModalOpen(false);
      handleChange("stepSix")({
        ...formValues.stepSix,
        ...initialBillingAddress.values,
      });
    } else {
      console.log("Form contains errors. Cannot save address.");
    }
  };

  const [addoncart, setAddonCart] = useState(
    formValues.stepTen.addoncart || []
  );

  useEffect(() => {
    handleChange("stepTen")({ addoncart });
  }, [addoncart]);

  // Initialize quantities state for items in the cart
  const [quantities, setQuantities] = useState(
    cart.map((item) => item.quantity || 1)
  );

  // Handlers for increasing and decreasing quantity
  const increaseQuantity = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);
    const newCart = [...cart];
    newCart[index].quantity = newQuantities[index];
    setCart(newCart);
  };

  const decreaseQuantity = (index) => {
    if (quantities[index] > 1) {
      const newQuantities = [...quantities];
      newQuantities[index] -= 1;
      setQuantities(newQuantities);
      const newCart = [...cart];
      newCart[index].quantity = newQuantities[index];
      setCart(newCart);
    }
  };

  // Function to remove a supplement from the cart
  const removeSupplement = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    const newQuantities = [...quantities];
    newQuantities.splice(index, 1);
    setQuantities(newQuantities);
  };

  // Initialize quantities state for items in the cart
  const [addonQuantities, setAddonQuantities] = useState(
    addoncart.map((item) => item.quantity || 1)
  );
  // Handlers for increasing and decreasing quantity
  const increaseAddonQuantity = (index) => {
    const newAddonQuantities = [...addonQuantities];
    newAddonQuantities[index] += 1;
    setAddonQuantities(newAddonQuantities);
    const newAddonCart = [...addoncart];
    newAddonCart[index].quantity = newAddonQuantities[index];
    setAddonCart(newAddonCart);
  };

  const decreaseAddonQuantity = (index) => {
    if (addonQuantities[index] > 1) {
      const newAddonQuantities = [...addonQuantities];
      newAddonQuantities[index] -= 1;
      setAddonQuantities(newAddonQuantities);
      const newAddonCart = [...addoncart];
      newAddonCart[index].quantity = newAddonQuantities[index];
      setAddonCart(newAddonCart);
    }
  };

  const removeAddon = (index) => {
    const newAddoncart = [...addoncart];
    newAddoncart.splice(index, 1);
    setAddonCart(newAddoncart);
    const newAddonQuantities = [...addonQuantities];
    newAddonQuantities.splice(index, 1);
    setAddonQuantities(newAddonQuantities);
    // remove from addoncart
    handleChange("stepTen")({ addoncart: newAddoncart });
  };

  const handlePayment = () => {
    setIsPaymentModalOpen(true);
  };

  // Function to calculate total cost from cart and cart2
  const calculateTotalCost = () => {
    let total = 0;

    // Calculate total from cart2 (medication items)
    cart2.forEach((item) => {
      const itemPrice = parseFloat(item.plan.price.replace(/[$,]/g, ""));
      const itemQuantity = item.quantity || 1; // Default to 1 if quantity is not provided or falsy

      // Check monthPlan and adjust price calculation accordingly
      if (item.plan.code === "1M") {
        total += itemPrice * itemQuantity; // Monthly price
      } else if (item.plan.code === "3M") {
        total += itemPrice * itemQuantity * 3; // Three months price
      }
    });

    // Calculate total from cart (additional supplements)
    cart.forEach((item) => {
      const itemPrice = parseFloat(item.price.replace(/[$,]/g, ""));
      const itemQuantity = item.quantity || 1; // Default to 1 if quantity is not provided or falsy
      total += itemPrice * itemQuantity;
    });

    // Calculate total from addoncart (selected addons)
    addoncart.forEach((addon) => {
      const addonPrice = parseFloat(addon.price.replace(/[$,]/g, ""));
      const addonQuantity = addon.quantity || 1; // Default to 1 if quantity is not provided or falsy
      total += addonPrice * addonQuantity; // Add the price of each addon multiplied by its quantity
    });

    // Check if total is NaN (Not a Number)
    if (isNaN(total)) {
      console.error(
        "Total calculation resulted in NaN. Check item prices and quantities."
      );
      return "Error"; // Return an error message or handle accordingly
    }

    return total.toFixed(2); // Return total as a string with 2 decimal places
  };

  const handleMonthPlanChange = (item, pendingChanges) => {
    // Update formValues.stepTwo with new values
    handleChange("stepTwo")({
      ...formValues.stepTwo,
      plan: {
        ...formValues.stepTwo.plan,
        ...pendingChanges,
      },
    });

    createAgain();
    // Update cart2 with new values
    const updatedCart2 = cart2.map((cartItem) => {
      if (cartItem.id === item.id) {
        return {
          ...cartItem, // Preserve other properties of cartItem
          plan: {
            ...cartItem.plan, // Preserve existing plan properties
            ...pendingChanges,
          },
        };
      }
      return cartItem; // Return unchanged cartItem if ID doesn't match
    });

    setCart2(updatedCart2); // Assuming setCart2 is defined and updates cart2 state
  };

  const handleClose = () => {
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="formContainer step-form">
      <div className="title-info">
        <h2>{t("stepTen.title")}</h2>
        <div className="plan">
          <h3 className="greeting">
            {t("stepTen.greeting")} {formValues.stepSix.lastName},
          </h3>
          <p className="review-plan">{t("stepTen.planDesc")}</p>
        </div>
      </div>

      <div className="total-cost">
        {/* Display cart2 items */}
        {cart2.map((item, index) => {
          // Determine the multiplier based on monthPlan
          let multiplier = 1;
          if (item.plan.code === "1M") {
            multiplier = 1;
          } else if (item.plan.code === "3M") {
            multiplier = 3;
          }

          // Calculate the adjusted price
          const adjustedPrice = `$${(
            parseFloat(item.plan.price.replace(/[$,]/g, "")) * multiplier
          ).toFixed(2)}`;

          return (
            <span key={index}>
              <div className="card-mini" key={index}>
                <div className="card-top">
                  <div className="card-img">
                    <img src={item.imgSrc} alt={item.title} />
                  </div>
                  <div className="card-title-price">
                    <span>
                      <button
                        className="change-frequency"
                        onClick={() => setMonthPlanModal(true)}
                      >
                        {t("stepTen.changeFrequency")}
                      </button>
                      <h3>{item.title}</h3>
                      <p className="title-desc">{item.titleDesc}</p>
                      <span className="">{item.type}</span>
                      <span className="">{item.descriptions[0]}</span>
                    </span>
                    <span className="bottom">
                      <h4 className="month-plan">{item.plan.title}</h4>
                      <h4>{adjustedPrice}</h4>
                    </span>
                  </div>
                </div>
              </div>
            </span>
          );
        })}

        {/* Display cart items */}
        {cart.length === 0 ? (
          <div className="additional-suppliments">
            <span>
              <h3>{t("stepTen.additionalSupplements")}</h3>
              <p>{t("stepTen.noSupplementsSelected")}</p>
            </span>
            <button className="add-suppliment" onClick={addSuppliment}>
              {t("stepTen.addSupplements")}{" "}
              <img src="/assets/arrowblue.svg" alt="" />
            </button>
          </div>
        ) : (
          <div className="additional-suppliments cart-added">
            <div className="fsdfg">
              <h3 className="title-card-add">
                {t("stepTen.additionalSupplements")}
              </h3>
              <span className="suppliment">
                <button className="add-suppliment" onClick={addSuppliment}>
                  {t("stepTen.addSupplements")}{" "}
                  <img src="/assets/arrowblue.svg" alt="" />
                </button>
              </span>
            </div>
            <div className="supplements-card all-added-supplements">
              {cart.map((item, index) => (
                <div className="card card-2" key={index}>
                  <div className="card-top card-2-top">
                    <div className="card-img">
                      <img src={item.imgSrc} alt={item.title} />
                    </div>
                    <div className="card-title-price title-price-stepthree">
                      <div className="title-price">
                        <h3 className="card-2-title">{item.title}</h3>
                        <h3
                          className={`${
                            item.price == "$0" ? "free-green" : "price-items"
                          }`}
                        >
                          {item.price == "$0" && "Free"}
                        </h3>
                      </div>
                      <div className="price-desc">
                        <p>{item.description}</p>
                      </div>
                      <span className="bottom" key={index}>
                        <h4>Quantity: {item.quantity}</h4>
                        {item.price !== "$0" && (
                          <h4>
                            {$(
                              parseFloat(item.price.replace(/[$,]/g, "")) *
                                item.quantity
                            ).toFixed(2)}
                          </h4>
                        )}
                      </span>
                    </div>
                  </div>
                  {item.price !== "$0" && (
                    <div className="btn-group cart-actions quantity">
                      <div className="quantity-control">
                        <button
                          className="quantity-btn quantity-increase"
                          onClick={() => decreaseQuantity(index)}
                        >
                          -
                        </button>
                        <span>{quantities[index]}</span>
                        <button
                          className="quantity-btn quantity-dicrease"
                          onClick={() => increaseQuantity(index)}
                        >
                          +
                        </button>
                      </div>
                      <span
                        className="remove-suppliment"
                        onClick={() => removeSupplement(index)}
                      >
                        <img src="/assets/delete.svg" alt="" />
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display addoncart items */}
        {addoncart.length === 0 ? (
          <div className="additional-suppliments">
            <span className="no-selected">
              <h3>{t("stepTen.availableAddon")}</h3>
              <p>{t("stepTen.noAddonSelected")}</p>
            </span>
            <button className="add-suppliment" onClick={addAddon}>
              {t("stepTen.addAddons")}{" "}
              <img src="/assets/arrowblue.svg" alt="" />
            </button>
          </div>
        ) : (
          <div className="additional-suppliments cart-added">
            <div className="fsdfg">
              <h3 className="title-card-add">{t("stepTen.availableAddon")}</h3>
              <span className="suppliment">
                <button className="add-suppliment" onClick={addAddon}>
                  {t("stepTen.addAddons")}{" "}
                  <img src="/assets/arrowblue.svg" alt="" />
                </button>
              </span>
            </div>
            <div className="supplements-card all-added-supplements">
              {addoncart.map((item, index) => (
                <div className="card card-2" key={index}>
                  <div className="card-top card-2-top">
                    <div className="card-img">
                      <img src={item.imgSrc} alt={item.title} />
                    </div>
                    <div className="card-title-price title-price-stepthree">
                      <div className="title-price">
                        <h3 className="card-2-title">{item.title}</h3>
                        <h3 className="price-items">{item.price}</h3>
                      </div>
                      <div className="price-desc">
                        <p>{item.description}</p>
                      </div>
                      <span className="bottom">
                        <h4>Quantity {item.quantity}</h4>
                        <h4>
                          $
                          {(
                            parseFloat(item.price.replace(/[$,]/g, "")) *
                            item.quantity
                          ).toFixed(2)}
                        </h4>
                      </span>
                    </div>
                  </div>
                  <div className="btn-group cart-actions quantity">
                    <div className="quantity-control">
                      <button
                        className="quantity-btn quantity-increase"
                        onClick={() => decreaseAddonQuantity(index)}
                      >
                        -
                      </button>
                      <span>{addonQuantities[index]}</span>
                      <button
                        className="quantity-btn quantity-dicrease"
                        onClick={() => increaseAddonQuantity(index)}
                      >
                        +
                      </button>
                    </div>
                    <span
                      className="remove-suppliment"
                      onClick={() => removeAddon(index)}
                    >
                      <img src="/assets/delete.svg" alt="" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <hr />
        <span className="total">
          <h3>{t("stepTen.totalCost")}</h3>
          <h2>
            {calculateTotalCost()} <p>{t("stepTen.dueToday")}</p>
          </h2>
        </span>
      </div>

      {monthPlanModal && (
        <MonthPlanModal
          isOpen={monthPlanModal}
          onClose={() => setMonthPlanModal(false)}
          item={cart2[0]} // Pass the appropriate item from cart2 that modal needs
          handleMonthPlanChange={handleMonthPlanChange} // Pass the handler function
        />
      )}

      <fieldset className="included-card">
        <legend>{t("stepTen.whatsIncluded")}</legend>
        <div className="included-card-content">
          <span>
            <img src="/assets/checkmark.svg" alt="checkmark" />
            <p>{t("stepTen.providerEvaluation")}</p>
          </span>
          <span>
            <img src="/assets/checkmark.svg" alt="checkmark" />
            <p>{t("stepTen.medicationAdjustments")}</p>
          </span>
          <span>
            <img src="/assets/checkmark.svg" alt="checkmark" />
            <p>{t("stepTen.onGoingCheckIns")}</p>
          </span>
          <span>
            <img src="/assets/checkmark.svg" alt="checkmark" />
            <p>{t("stepTen.nutritionPlan")}</p>
          </span>
          <span>
            <img src="/assets/checkmark.svg" alt="checkmark" />
            <p>{t("stepTen.syringes")}</p>
          </span>
          <span>
            <img src="/assets/checkmark.svg" alt="checkmark" />
            <p>{t("stepTen.shipping")}</p>
          </span>
        </div>
      </fieldset>

      <div className="outside-padding">
        <div className="shipping-address-section">
          <span className="shipping-add-top">
            <h3>{t("stepTen.shippingAddress")}</h3>
            <button
              className="btn-edit"
              onClick={() => setIsShippingModalOpen(true)}
            >
              {t("stepTen.edit")}
            </button>
          </span>
          <div className="shipping-address">
            <p>{formValues.stepSix.streetAddress1}</p>
            <p>{formValues.stepSix.streetAddress2}</p>
            <p>
              {formValues.stepSix.city}, {formValues.stepSix.state}{" "}
              {formValues.stepSix.zipCode}
            </p>
          </div>
        </div>
      </div>

      <ShippingAddressModal
        isOpen={isShippingModalOpen}
        onClose={() => setIsShippingModalOpen(false)}
        shippingAddress={initialShippingAddress.values}
        handleSubmit={handleShippingSubmit}
        handleInputChange={initialShippingAddress.handleChange}
        stateOptions={stateOptions}
        validateField={initialShippingAddress.validateField}
        setToInitial={initialShippingAddress.setToInitial}
      />

      <div className="outside-padding">
        <div className="billing-address-section">
          <span className="billing-add-top">
            <h3>{t("stepTen.billingAddress")}</h3>
            <button
              className="btn-edit"
              onClick={() => setIsBillingModalOpen(true)}
            >
              {t("stepTen.edit")}
            </button>
          </span>
          <div className="billing-address">
            <p>{formValues.stepSix.billingStreetAddress1}</p>
            <p>{formValues.stepSix.billingStreetAddress2}</p>
            <p>
              {formValues.stepSix.billingCity},{" "}
              {formValues.stepSix.billingState}{" "}
              {formValues.stepSix.billingZipCode}
            </p>
          </div>
        </div>
      </div>

      <BillingAddressModal
        isOpen={isBillingModalOpen}
        onClose={() => setIsBillingModalOpen(false)}
        billingAddress={initialBillingAddress.values}
        handleSubmit={handleBillingSubmit}
        handleInputChange={initialBillingAddress.handleChange}
        stateOptions={stateOptions}
        validateField={initialBillingAddress.validateField}
        setToInitial={initialBillingAddress.setToInitial}
      />

      <div className="btn-group btn-group-stepthree">
        <button className="back-btn back-btn-stepthree" onClick={prevStep}>
          <img src="/assets/arrow.svg" alt="arrow" /> {t("stepTen.back")}
        </button>
        <div className="forward-btns">
          <button
            className="long-btn long-btn-stepthree"
            onClick={handlePayment}
            disabled={!formValues.order.TotalAmount}
          >
            <img src="/assets/secure.svg" alt="" />{" "}
            {t("stepTen.proceedToPayment")}{" "}
          </button>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        order={formValues.order}
        onClose={handleClose}
      />
      <Review />
    </div>
  );
};

export default StepTen;
