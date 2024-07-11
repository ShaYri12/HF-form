import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import Modal from "react-modal";
import apiService from "./APIService";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import { useTranslation } from "react-i18next";

// test key
const stripePromise = loadStripe(
  "pk_test_51PNcPDP3e6jM6cjMGYmz3jixzZsf1EV80W59EcKoXi6XVezDMKFf063izRLtmYZTQqZG0VF0PylkJpbKTlAPpcEL00rgkHzkn6"
);

const PaymentModal = ({
  isOpen,
  onClose,
  type,
  order,
  options: passedOptions,
}) => {
  const { t } = useTranslation();
  const OneTimeModal = () => {
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);

    const handleBack = () => {
      if (onClose) onClose();
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!elements) return;
      setLoading(true);
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        return;
      }

      try {
        const res = await apiService.createPaymentIntent(
          Math.round(order.TotalAmount * 100),
          "usd",
          order.OrderNumber,
          order.Customer.Id,
          order.Customer.Name
        );

        const { client_secret: clientSecret } = res;

        const confirmRes = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            return_url:
              window.location.protocol +
              "//" +
              window.location.host +
              `/thankyou?orderNumber=${order.OrderNumber}`,
          },
        });

        console.log("Payment response", confirmRes);
        setLoading(false);
        if (confirmRes.error) {
          console.error(confirmRes.error);
          setErrorMessage(confirmRes.error.message);
        } else {
          if (onClose) onClose(); // Close the modal on successful payment
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
        setErrorMessage(
          error.message || "An error occurred during the payment process."
        );
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          height: "460px",
        }}
      >
        <button
          onClick={handleBack}
          disabled={!stripe || !elements}
          className="payment-close"
          style={{ marginBottom: "0" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
          </svg>
        </button>

        <div className="text-lg font-semibold text-gray-800 payment-order-total">
          {t("stepTen.yourTotal")}{" "}
          <span className="font-bold">
            {order.TotalAmount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>
        <div className="card-element">
          <PaymentElement />
        </div>
        {loading && (
          <CircleSpinnerOverlay message={"Please Wait.."} color="#114398" />
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {!errorMessage && <div className="error-message-placeholder"></div>}
        <div className="btn-group">
          <button
            type="submit"
            disabled={!stripe || !elements}
            className="long-btn "
          >
            {t("stepTen.pay")}
          </button>
        </div>
      </form>
    );
  };

  const defaultOptions = {
    mode: "payment",
    currency: "usd",
    amount: Math.round(order.TotalAmount * 100),
    appearance: {
      /* Customizable appearance */
    },
  };

  const options = { ...defaultOptions, ...passedOptions };

  const SubscriptionModal = () => {
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);

    const handleBack = () => {
      if (onClose) onClose();
    };

    const createSubscription = async (paymentRequest) => {
      setLoading(true);
      const metadata = {
        orderNumber: order.OrderNumber,
        customerId: order.Customer.Id,
        customerName: order.Customer.Name,
      };
      const paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: elements?.getElement(CardElement),
        billing_details: {
          name: order.Customer.Name,
          email: order.Customer.Email,
        },
        metadata,
      });

      const request = {
        customer: {
          email: order.Customer.Email,
          name: order.Customer.Name,
          phone: order.Customer.Phone,
        },

        products: order.Products.map((product) => ({
          priceId: product.stripe_price_id,
        })),
        paymentMethod: paymentMethod.paymentMethod.id,
        metadata,
      };

      try {
        const { clientSecret } = await apiService.createSubscription(
          request,
          "subscription"
        );
        const confirmPayment = await stripe.confirmCardPayment(clientSecret);
        setLoading(false);
        if (confirmPayment.error) {
          console.error(confirmPayment.error);
          setErrorMessage(confirmPayment.error.message);
        } else {
          window.location.href = `/thankyou?success=true&orderNumber=${order.OrderNumber}`;
          console.log("Payment successful", confirmPayment);
          if (onClose) onClose();
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
        setErrorMessage(
          error.message || "An error occurred during the payment process."
        );
      }
    };

    return (
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          createSubscription();
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <button
          onClick={handleBack}
          disabled={!stripe || !elements}
          className="payment-close"
          style={{ marginBottom: "0" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
          </svg>
        </button>
        {loading && (
          <CircleSpinnerOverlay message={"Please Wait.."} color="#114398" />
        )}
        <div className="text-lg font-semibold text-gray-800 payment-order-total">
          {t("stepTen.yourTotal")}{" "}
          <span className="font-bold">
            {order.TotalAmount.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>
        <div className="card-element">
          <CardElement />
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {!errorMessage && <div className="error-message-placeholder"></div>}
        <div className="btn-group">
          <button
            type="submit"
            disabled={!stripe || !elements}
            className="long-btn "
          >
            {t("stepTen.pay")}
          </button>
        </div>
      </form>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Payment Modal"
      style={{
        content: {
          top: "45%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          paddingTop: "20px",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "90%", // Adjust width for responsiveness
          maxWidth: "600px", // Limit max width
        },
      }}
    >
      <div>
        <h2 className="payment-heading">{t("stepTen.finalizePay")}</h2>
        <Elements stripe={stripePromise} options={options}>
          {order.Type === "Subscription" ? (
            <SubscriptionModal />
          ) : (
            <OneTimeModal />
          )}
        </Elements>
      </div>
    </Modal>
  );
};

export default PaymentModal;
