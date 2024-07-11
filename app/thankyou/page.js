"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { I18nextProvider } from "react-i18next";
import i18n from "../context/i18n";
import ProgressBar from "../components/ProgressBar";
import ZohoSalesIQWidget from "../components/IntercomWidget";
import "../styles/form.css";
import "../styles/thankyou.css";

const ThankYouPage = () => {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState({}); // Initialize with an empty object
  const [queryParameters, setQueryParameters] = useState({});
  const [chatWidgetReady, setChatWidgetReady] = useState(false);

  useEffect(() => {
    // Retrieve formValues from localStorage on component mount
    const storedFormValues = JSON.parse(localStorage.getItem("formValues"));
    if (storedFormValues) {
      setFormValues(storedFormValues);
    }

    // Parse URL query parameters
    const searchParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    setQueryParameters(params);

    // Check if Zoho SalesIQ chat widget script is loaded
    const checkChatWidget = setInterval(() => {
      if (window.$zoho && window.$zoho.salesiq && window.$zoho.salesiq.chat) {
        clearInterval(checkChatWidget);
        setChatWidgetReady(true);
      }
    }, 1000);

    return () => clearInterval(checkChatWidget);
  }, []);

  const handleDoctorClick = () => {
    if (chatWidgetReady) {
      window.$zoho.salesiq.chat.start();
    } else {
      console.warn("Chat widget is not ready yet.");
    }
  };

  return (
    <I18nextProvider i18n={i18n}>
      <div className="container">
        <img
          className="backgroundimg"
          src="/assets/backgroundimg.png"
          alt="Background"
        />
        <div className="formContainer">
          <ProgressBar step={15} totalSteps={15} />
          <div className="logo">
            <img src="/assets/logo.webp" alt="Logo" />
          </div>
          <div className="formContainer step-form">
            <div className="thank-you">
              <h3>{t("thankYou.title")}</h3>
              <p>{t("thankYou.message")}</p>
            </div>

            <div className="about-appointment">
              <h3>{t("thankYou.appointmentDetails")}</h3>
              <span>
                {t("thankYou.date")}:{" "}
                {formValues.appointment?.selectedDay || "N/A"}
              </span>
              <span>
                {t("thankYou.time")}:{" "}
                {formValues.appointment?.selectedTime?.start} -{" "}
                {formValues.appointment?.selectedTime?.end} EST
              </span>
            </div>

            <div className="order-details">
              <h3>Order Details</h3>
              <p>
                {t("thankYou.orderNumber")}:{" "}
                {queryParameters.orderNumber || "N/A"}
              </p>
            </div>

            <div className="assistance">
              <h3>{t("thankYou.assistanceTitle")}</h3>
              <p>{t("thankYou.assistanceMessage")}</p>
            </div>

            <div className="btn-group final-btn">
              <a
                href="https://wa.link/hwnq49"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="arrow-btn whatsapp-btn">
                  <img src="/assets/whatsapp.svg" alt="" />
                </button>
              </a>

              <a
                href="https://wa.link/hwnq49"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-link"
              >
                <button className="long-btn whatsapp-btn">
                  {t("thankYou.whatsappBtn")}
                </button>
              </a>
            </div>

            <div className="doctor" onClick={handleDoctorClick}>
              <img src="/assets/doctor.jpg" alt="doctorImg" />
              <span className="doctor-texts">
                <h3>{t("thankYou.doctorText.title")}</h3>
                <p>{t("thankYou.doctorText.support")}</p>
                <span>{t("thankYou.doctorText.online")}</span>
              </span>
              <span className="popup">1</span>
            </div>
          </div>
        </div>
      </div>
      <ZohoSalesIQWidget user={formValues.user} />
    </I18nextProvider>
  );
};

export default ThankYouPage;
