"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/stepeight.css";
import "../styles/form.css";
import Review from "./Review";

const StepEight = ({
  nextStep,
  prevStep,
  handleChange,
  updateNotEligibleData,
  handleNotEligible,
}) => {
  const { t } = useTranslation();

  const [selectedConditions, setSelectedConditions] = useState([]);
  const [formData, setFormData] = useState({ selectedConditions: [] });
  const [error, setError] = useState("");

  const disqualifyingConditions = [
    "Pregnant",
    "Breastfeeding",
    "Type 1 Diabetes",
    "Thyroid Cancer",
    "Pancreatitis",
    "Bariatric Surgery",
  ];

  const handleCheckboxChange = (condition) => {
    if (condition === "None") {
      setSelectedConditions(["None"]); // Select "none" only
      handleChange({ selectedConditions: ["None"] }); // Emit updated formData to parent
      nextStep();
    } else {
      let updatedConditions;
      if (selectedConditions.includes("None")) {
        updatedConditions = [condition]; // Replace "none" with the selected condition
      } else {
        updatedConditions = selectedConditions.includes(condition)
          ? selectedConditions.filter((c) => c !== condition)
          : [...selectedConditions, condition];
      }
      setSelectedConditions(updatedConditions);
      handleChange({ selectedConditions: updatedConditions }); // Emit updated formData to parent
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedConditions.length === 0) {
      setError(t("error.healthConditionsError"));
    } else if (
      selectedConditions.some((condition) =>
        disqualifyingConditions.includes(condition)
      )
    ) {
      const newData = {
        title: t("error.disqualifyTitle"),
        desc: t("error.disqualifyMsg"),
      };
      updateNotEligibleData(newData);
      handleNotEligible();
    } else {
      // Save form values or perform any necessary actions
      console.log("Form data:", formData);
      nextStep();
    }
  };

  const conditions = [
    { id: "none", labelKey: "none", apiValue: "None" },
    {
      id: "highbp",
      labelKey: "highBloodPressure",
      apiValue: "High Blood Pressure",
    },
    { id: "pre-diabetes", labelKey: "preDiabetes", apiValue: "Pre-Diabetes" },
    {
      id: "type-2-diabetes",
      labelKey: "type2Diabetes",
      apiValue: "Type 2 Diabetes",
    },
    {
      id: "hypothyroidism",
      labelKey: "hypothyroidism",
      apiValue: "Hypothyroidism",
    },
    {
      id: "crohn-disease",
      labelKey: "crohnsDisease",
      apiValue: "Crohn's Disease",
    },
    {
      id: "elevated-triglycerides",
      labelKey: "elevatedTriglycerides",
      apiValue: "Elevated Triglycerides",
    },
    { id: "lupus", labelKey: "lupus", apiValue: "Lupus" },
    { id: "antibiotics", labelKey: "antibiotics", apiValue: "Antibiotics" },
    {
      id: "bariatric-surgery",
      labelKey: "bariatricSurgery",
      apiValue: "Bariatric Surgery",
    },
    { id: "hypoglycemia", labelKey: "hypoglycemia", apiValue: "Hypoglycemia" },
    {
      id: "type-1-diabetes",
      labelKey: "type1Diabetes",
      apiValue: "Type 1 Diabetes",
    },
    {
      id: "cancer-treatment",
      labelKey: "cancerTreatment",
      apiValue: "Cancer Treatment",
    },
    {
      id: "thyroid-cancer",
      labelKey: "thyroidCancer",
      apiValue: "Thyroid Cancer",
    },
    {
      id: "breastfeeding",
      labelKey: "breastfeeding",
      apiValue: "Breastfeeding",
    },
    { id: "pregnant", labelKey: "pregnant", apiValue: "Pregnant" },
    { id: "pancreatitis", labelKey: "pancreatitis", apiValue: "Pancreatitis" },
  ];

  return (
    <div className="formContainer step-form">
      <div className="label-info">
        <h2>{t("stepEight.title")}</h2>
        <p>{t("stepEight.description")}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-form">
          <div className="condition-select">
            {conditions.map((condition) => (
              <div
                className="condition-option"
                key={condition.id}
                onClick={() => {
                  document.getElementById(condition.id).click();
                }}
                style={{
                  border: selectedConditions.includes(condition.apiValue)
                    ? "1px solid black"
                    : "",
                }}
              >
                <input
                  type="checkbox"
                  id={condition.id}
                  name="condition"
                  checked={selectedConditions.includes(condition.apiValue)}
                  onChange={() => handleCheckboxChange(condition.apiValue)}
                />
                <label
                  onClick={() => {
                    document.getElementById(condition.id).click();
                  }}
                >
                  {t(`stepEight.${condition.labelKey}`)}
                </label>
              </div>
            ))}
          </div>
          {error && <p className="error">{error}</p>}
        </div>

        <div className="btn-group btn-group-stepthree">
          <button
            type="button"
            className="back-btn back-btn-stepthree"
            onClick={prevStep}
          >
            <img src="/assets/arrow.svg" alt="arrow" /> {t("stepEight.back")}
          </button>
          <div className="forward-btns">
            <button type="submit" className="long-btn long-btn-stepthree">
              {t("stepEight.continueJourney")}
            </button>
          </div>
        </div>
      </form>

      <Review />
    </div>
  );
};

export default StepEight;
