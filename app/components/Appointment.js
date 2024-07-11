import { useState, useEffect } from "react";
import "../styles/form.css";
import "../styles/steptwelve.css";
import { useTranslation } from "react-i18next";
import apiService from "./APIService";
import { DateTime } from "luxon"; // Import Luxon
import { CircleSpinnerOverlay } from "react-spinner-overlay";

const StepTwelve = ({ nextStep, handleChange, formValues }) => {
  const { t } = useTranslation();

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isTodayOrFuture, setIsTodayOrFuture] = useState(true);
  const [appointmentDate, setAppointmentDate] = useState(
    DateTime.now().plus({ days: 1 })
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to store API error

  useEffect(() => {
    const today = DateTime.now();
    const nextDay = today.plus({ days: 1 });

    const formattedDate = nextDay.toLocaleString(DateTime.DATE_HUGE);
    setAppointmentDate(nextDay);

    setSelectedDay(formattedDate);
    onDayChange(nextDay);
  }, []);

  const handleDayIncrement = () => {
    const currentDay = appointmentDate || DateTime.now();
    const nextDay = currentDay.plus({ days: 1 });

    const formattedDate = nextDay.toLocaleString(DateTime.DATE_HUGE);

    setSelectedDay(formattedDate);
    setAppointmentDate(nextDay);
    setIsTodayOrFuture(true);
    onDayChange(nextDay);
  };

  const handleDayDecrement = () => {
    const today = DateTime.now().startOf("day").plus({ days: 1 });
    const currentDay = appointmentDate.minus({ days: 1 });

    if (currentDay > today) {
      const formattedDate = currentDay.toLocaleString(DateTime.DATE_HUGE);

      setSelectedDay(formattedDate);
      setAppointmentDate(currentDay);
      onDayChange(currentDay);
      setIsTodayOrFuture(currentDay.minus({ days: 1 }) > today);
    } else {
      setIsTodayOrFuture(false);
    }
  };

  const onDayChange = (nextDay) => {
    setLoading(true);
    apiService
      .getBookings(nextDay.toJSDate())
      .then((data) => {
        // filter out slots where available is false
        data = data.filter((slot) => slot.available);
        setTimeSlots(data);
        setLoading(false);
        setError(null); // Clear any previous errors on successful fetch
      })
      .catch((error) => {
        console.error("Error fetching slots:", error);
        setError("Error fetching slots. Please try again."); // Set error state
        setLoading(false);
      });
  };

  const handleTimeSelection = (time) => {
    if (!time.available) return;
    setSelectedTime(time);
    setShowModal(true);
  };

  const confirmAppointment = () => {
    setShowModal(false);
    handleChange({
      selectedDay,
      selectedTime,
    });
    nextStep();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="formContainer step-form">
      {loading && (
        <CircleSpinnerOverlay message={"Please Wait..."} color="#114398" />
      )}
      <div className="title-info">
        <h2>{t("stepTwelve.title")}</h2>
        <p>{t("stepTwelve.chooseTime")}</p>
      </div>
      <div className="schedule-section">
        <div className="schedule-header">
          <button onClick={handleDayDecrement} disabled={!isTodayOrFuture}>
            <img alt="left-arrow" src="/assets/arrow.svg" />
          </button>
          <h3>{selectedDay}</h3>
          <button onClick={handleDayIncrement}>
            <img
              className="right-arrow"
              alt="right-arrow"
              src="/assets/arrow.svg"
            />
          </button>
        </div>
        <div className="times">
          {error && <p className="error-message">{error}</p>}
          <div className="time-options">
            {(timeSlots || []).map((slot, index) => (
              <div
                key={index}
                className={`time ${selectedTime === slot ? "active" : ""} ${
                  !slot.available ? "disabled" : ""
                }`}
                onClick={() => handleTimeSelection(slot)}
                disabled={!slot.available}
              >
                {slot.start}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{t("stepTwelve.confirmAppointment")}</h3>
            <p>
              {selectedDay} - {selectedTime.start}
            </p>
            <div className="btn-group">
              <div className="forward-btns">
                <button className="cancel-btn" onClick={closeModal}>
                  {t("stepTwelve.cancel")}
                </button>
                <button className="confirm-btn" onClick={confirmAppointment}>
                  {t("stepTwelve.confirm")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepTwelve;
