"use client";
import { useEffect, useState } from "react";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import PlanSelection from "./components/PlanSelection";
import Suppliments from "./components/Suppliments";
import AddAddonsStep from "./components/AddAddonsStep";
import StepFour from "./components/StepFour";
import StepFive from "./components/StepFive";
import StepSix from "./components/StepSix";
import StepSeven from "./components/StepSeven";
import StepEight from "./components/StepEight";
import StepNine from "./components/StepNine";
import StepTen from "./components/StepTen";
import StepEleven from "./components/StepEleven";
import Appointment from "./components/Appointment";
import AppointmentConfirmed from "./components/AppointmentConfirm";
import NotEligible from "./components/NotEligible";
import ProgressBar from "./components/ProgressBar";
import AddSuppliment from "./components/AddSuppliment";
import AvailableAddons from "./components/AvailableAddons";
import { I18nextProvider } from "react-i18next";
import i18n from "./context/i18n";
import "./styles/form.css";
import { useStep } from "./context/StepContext";
import Timer from "./components/Timer";
import LoadingScreen from "./components/LoadingScreen"; // Import the new LoadingScreen component
import { currencyToNumber } from "./utils/currencyUtils";
import apiService from "./components/APIService";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import { useFormValues } from "./context/FormValuesContext";
import { stateOptions } from "./components/StateOptions";

let debouncedUpsertPatient;
let debouncedCreateBooking;
let debouncedCreateOrder;
// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
const stepsToSave = [
  "stepSix",
  "stepSeven",
  "stepEight",
  "stepNine",
  "stepTen",
];
const Home = () => {
  const { step, nextStep: nextStepOriginal, prevStep, goToStep } = useStep();

  const [loading, setLoading] = useState(false); // New loading state
  const [currentStepSixQuestion, setCurrentStepSixQuestion] = useState(0);
  const [currentStepSevenQuestion, setCurrentStepSevenQuestion] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [currentStep, setCurrentStep] = useState("stepOne");
  const [spinnerMessage, setSpinnerMessage] = useState("Please wait...");
  const { formValues, setFormValues } = useFormValues();

  const nextStep = async () => {
    const record = formValues.stepSix;
    if (
      (currentStep == "stepTen" || step === 14) &&
      record.email &&
      record.phone &&
      record.day &&
      record.month &&
      record.year
    ) {
      setSpinnerMessage("Preparing your cart...");
      await debouncedUpsertPatient(formValues);
      await debouncedCreateOrder(formValues);
      setSpinnerMessage("Please wait...");
    }
    nextStepOriginal();
  };

  const createAgain = async () => {
    await debouncedUpsertPatient(formValues);
    await debouncedCreateOrder(formValues);
  };

  // Debounced API calls
  debouncedUpsertPatient =
    debouncedUpsertPatient ||
    debounce((values) => {
      apiService.upsertPatient(values).then((data) => {
        console.log("Patient created", data);
        setFormValues((prevState) => ({
          ...prevState,
          ...data,
        }));
      });
    }, 1000); // 500 ms wait time

  debouncedCreateBooking =
    debouncedCreateBooking ||
    debounce((selectedTime) => {
      selectedTime.booking = formValues.booking;
      apiService.createBooking(selectedTime).then((data) => {
        setFormValues((prevState) => ({
          ...prevState,
          booking: data,
        }));
      });
    }, 1000);

  debouncedCreateOrder =
    debouncedCreateOrder ||
    debounce((order) => {
      setSpinner(true);
      console.log("Creating order", order);
      order.Id = formValues?.order?.Id;
      apiService.createOrder(order).then((data) => {
        console.log("Order created", data);
        setFormValues((prevState) => ({
          ...prevState,
          order: data,
        }));
        setSpinner(false);
      });
    }, 1000);

  function onChange(component, data) {
    console.log("handleChange", component, data, formValues);
    setCurrentStep(component);
    if (stepsToSave.includes(component) && formValues.stepSix.streetAddress1) {
      const record = formValues.stepSix;
      // only save the record if the email, phone, day, month and year are present
      if (
        record.email &&
        record.phone &&
        record.day &&
        record.month &&
        record.year
      ) {
        debouncedUpsertPatient(formValues);
      }
    }

    if (component === "appointment") {
      const record = formValues.stepSix;
      const uuid = [
        record.email,
        record.phone,
        `${record.year}-${record.month}-${record.day}`,
      ].join(`||`);
      const { selectedDay, selectedTime } = data;
      selectedTime.uuid = uuid;
      debouncedCreateBooking(selectedTime);
    }

    if (component === "stepTen" && (formValues.id || formValues.Id)) {
      debouncedCreateOrder(formValues);
    }
  }

  const handleChange = (component) => (data) => {
    onChange(component, data);
    setFormValues((prevState) => ({
      ...prevState,
      [component]: {
        ...prevState[component],
        ...data,
      },
    }));
  };

  const [showNotEligible, setShowNotEligible] = useState(false);
  const [showAddSuppliment, setShowAddSuppliment] = useState(false);
  const [showAvailableAddons, setShowAvailableAddons] = useState(false);
  const [cart, setCart] = useState([]);
  const [cart2, setCart2] = useState([]);
  const [NotEligibleData, setNotEligibleData] = useState([]);

  const cartitem = (item) => {
    const updatedCart = [...cart];

    // Check if there is an existing item with the same title
    const existingIndex = updatedCart.findIndex(
      (cartItem) =>
        cartItem.title.trim().toLowerCase() === item.title.trim().toLowerCase()
    );

    if (existingIndex !== -1) {
      const existingItem = updatedCart[existingIndex];
      const existingPrice = currencyToNumber(existingItem.price);
      const newItemPrice = currencyToNumber(item.price);

      if (existingPrice === 0 && newItemPrice === 0) {
        // Both prices are $0, do nothing
        return;
      } else if (existingPrice === 0 && newItemPrice !== 0) {
        // Existing item price is $0, new item price is not $0, check for duplicate price
        const samePriceIndex = updatedCart.findIndex(
          (cartItem) => currencyToNumber(cartItem.price) === newItemPrice
        );
        if (samePriceIndex !== -1) {
          updatedCart[samePriceIndex].quantity += item.quantity;
        } else {
          updatedCart.push(item);
        }
      } else if (existingPrice !== 0 && newItemPrice === 0) {
        // Existing item price is not $0, new item price is $0, allow duplicate
        updatedCart.push(item);
      } else {
        // Both prices are not $0, increase the quantity of the existing item
        updatedCart[existingIndex].quantity += item.quantity;
      }
    } else {
      // Item does not exist in the cart, add it
      updatedCart.push(item);
    }

    setCart(updatedCart);
    handleChange("suppliments")({ cart: updatedCart });
  };

  const cartitem2 = (item) => {
    setCart2([item]);
  };

  const updateNotEligibleData = (data) => {
    setNotEligibleData(data);
  };

  const handleSubmit = () => {
    // Serialize formValues to JSON string
    const formDataJSON = JSON.stringify(formValues);
  };

  const handleNotEligible = () => {
    setShowNotEligible(true);
  };

  const handleEligible = () => {
    setShowNotEligible(false);
  };

  const handleAddSuppliment = () => {
    setShowAddSuppliment(true);
  };

  const handleAddAddon = () => {
    setShowAvailableAddons(true);
  };

  const handleOrignalStep = () => {
    goToStep(15);
    setShowAddSuppliment(false);
    setShowAvailableAddons(false);
  };

  const steps = [
    <StepOne
      nextStep={nextStep}
      handleChange={handleChange("stepOne")}
      values={formValues}
      stateOptions={stateOptions}
    />,
    <StepTwo
      nextStep={nextStep}
      prevStep={prevStep}
      handleChange={handleChange("stepTwo")}
      values={formValues}
      cartitem2={cartitem2}
    />,
    <PlanSelection
      nextStep={nextStep}
      prevStep={prevStep}
      handleChange={handleChange}
      values={formValues}
      cartitem2={cartitem2}
    />,
    <Suppliments
      prevStep={prevStep}
      nextStep={nextStep}
      handleChange={handleChange("suppliments")}
      values={formValues}
      setCartItem={setCart}
    />,
    <AddAddonsStep
      prevStep={prevStep}
      nextStep={nextStep}
      handleChange={handleChange("stepTen")}
      formValues={formValues}
    />,
    <StepFour
      prevStep={prevStep}
      nextStep={nextStep}
      handleChange={handleChange("stepFour")}
      values={formValues}
      updateNotEligibleData={updateNotEligibleData}
      handleNotEligible={handleNotEligible}
      setLoading={setLoading}
    />,
    <StepFive
      prevStep={prevStep}
      nextStep={nextStep}
      handleChange={handleChange("stepFive")}
      values={formValues}
      updateNotEligibleData={updateNotEligibleData}
      handleNotEligible={handleNotEligible}
    />,
    <StepSix
      prevStep={prevStep}
      nextStep={nextStep}
      handleChange={handleChange("stepSix")}
      formValues={formValues}
      updateNotEligibleData={updateNotEligibleData}
      handleNotEligible={handleNotEligible}
      currentQuestion={currentStepSixQuestion}
      setCurrentQuestion={setCurrentStepSixQuestion}
      stateOptions={stateOptions}
    />,
    <StepEleven
      prevStep={prevStep}
      nextStep={nextStep}
      handleChange={handleChange("stepEleven")}
      values={formValues}
    />,
    <Appointment
      prevStep={prevStep}
      nextStep={nextStep}
      handleChange={handleChange("appointment")}
      values={formValues}
    />,
    <AppointmentConfirmed
      prevStep={prevStep}
      nextStep={nextStep}
      values={formValues}
    />,
    <StepSeven
      prevStep={prevStep}
      nextStep={nextStep}
      handleChange={handleChange("stepSeven")}
      values={formValues}
      currentQuestion={currentStepSevenQuestion}
      setCurrentQuestion={setCurrentStepSevenQuestion}
    />,
    <StepEight
      prevStep={prevStep}
      nextStep={nextStep}
      handleChange={handleChange("stepEight")}
      values={formValues}
      updateNotEligibleData={updateNotEligibleData}
      handleNotEligible={handleNotEligible}
    />,
    <StepNine
      prevStep={prevStep}
      nextStep={nextStep}
      handleChange={handleChange("stepNine")}
      values={formValues}
    />,
    <StepTen
      prevStep={prevStep}
      handleChange={handleChange}
      formValues={formValues}
      cart={cart}
      cart2={cart2}
      setCart={setCart}
      setCart2={setCart2}
      addSuppliment={handleAddSuppliment}
      addAddon={handleAddAddon}
      handleSubmitHome={handleSubmit}
      stateOptions={stateOptions}
      createAgain={createAgain}
    />,
  ];

  return (
    <I18nextProvider i18n={i18n}>
      {spinner && (
        <CircleSpinnerOverlay color="#114398" message={spinnerMessage} />
      )}
      <div className="container">
        <img
          className="backgroundimg"
          src="/assets/backgroundimg.png"
          alt="Background"
        />
        <div className="formContainer step-container">
          <div className="form-header">
            <ProgressBar step={step} totalSteps={15} />
            {step >= 11 && step !== 15 && <Timer />}
          </div>
          {loading ? (
            <LoadingScreen nextStep={nextStep} setLoading={setLoading} />
          ) : (
            <>
              <div className="logo">
                <img src="/assets/logo.webp" alt="Logo" />
              </div>
              {showAddSuppliment ? (
                <AddSuppliment
                  handleOrignalStep={handleOrignalStep}
                  handleChange={handleChange("suppliments")}
                  cartitem={cartitem}
                />
              ) : showAvailableAddons ? (
                <AvailableAddons
                  handleOrignalStep={handleOrignalStep}
                  handleChange={handleChange("stepTen")}
                  formValues={formValues}
                />
              ) : showNotEligible ? (
                <NotEligible
                  NotEligibleData={NotEligibleData}
                  handleEligible={handleEligible}
                />
              ) : (
                steps[step - 1]
              )}
            </>
          )}
        </div>
      </div>
    </I18nextProvider>
  );
};

export default Home;
