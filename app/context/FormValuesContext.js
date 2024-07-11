"use client";
import React, { createContext, useState, useEffect, useContext } from "react";

const FormValuesContext = createContext();

export const useFormValues = () => {
  return useContext(FormValuesContext);
};

const defaultFormValues = {
  stepOne: {},
  stepTwo: {},
  planSelection: {},
  supplements: {}, // Corrected spelling
  stepFour: {},
  stepFive: {},
  stepSix: {},
  stepEleven: {},
  appointment: {},
  appointmentConfirmed: {},
  stepSeven: {},
  stepEight: {},
  stepNine: {},
  stepTen: {},
  ThankYou: {},
  order: {},
};

const resetLocalStorage = () => {
  try {
    localStorage.removeItem("formValues");
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

export const FormValuesProvider = ({ children }) => {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  // Initialize initialFormValues based on localStorage or defaultFormValues
  const getInitialFormValues = () => {
    if (isLocalStorageAvailable) {
      const storedFormValues = JSON.parse(localStorage.getItem("formValues"));
      if (storedFormValues) {
        return storedFormValues;
      } else {
        // If no stored formValues, initialize localStorage with defaultFormValues
        localStorage.setItem("formValues", JSON.stringify(defaultFormValues));
        return defaultFormValues;
      }
    } else {
      // If localStorage is not available, use defaultFormValues
      return defaultFormValues;
    }
  };

  const [formValues, setFormValues] = useState(getInitialFormValues());

  // Update localStorage whenever formValues change
  useEffect(() => {
    if (isLocalStorageAvailable) {
      try {
        localStorage.setItem("formValues", JSON.stringify(formValues));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  }, [formValues, isLocalStorageAvailable]);

  const updateFormValues = (values) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  const clearAndResetLocalStorage = () => {
    resetLocalStorage();
    setFormValues(defaultFormValues); // Reset formValues in state to defaultFormValues
  };

  return (
    <FormValuesContext.Provider
      value={{
        formValues,
        setFormValues,
        updateFormValues,
        clearAndResetLocalStorage,
      }}
    >
      {children}
    </FormValuesContext.Provider>
  );
};
