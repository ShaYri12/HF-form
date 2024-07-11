import salesforceService from "../services/salesforce.service";

class PatientService {
  async upsertPatient(patient) {
    const transformedPatient = this.transformPatient(patient);
    return await salesforceService.upsertPatient(transformedPatient);
  }

  transformPatient(record) {
    let res = {};
    // check if record contains keys stepOne, stepTwo, and stepThree
    if (record.stepOne || record.stepTwo || record.stepThree) {
      res = this.transformContact(record.stepSix);
      delete record.stepSix;

      if (record.stepOne) {
        res.Accepted_HealtFare_Agreement__c = record.stepOne.agreement;
      }

      // step for is weight and height
      if (record.stepFour) {
        const feet = this.checkIfFloat(record.stepFour.feet);
        const inches = this.checkIfFloat(record.stepFour.inches);
        // convert feet and inches to cm
        const height = feet * 30.48 + inches * 2.54;

        res.Weight__c = this.checkIfFloat(record.stepFour.pounds);
        res.Height__c = height;
      }

      if (record.stepSeven) {
        res.Current_Medications__c = record.stepSeven.question1 || "";
        res.Allergies_to_Medications__c = record.stepSeven.question2 || "";
        res.Prescription_over_the_counter_diet_aid__c =
          record.stepSeven.question3 || "";
        res.Current_Antibiotics__c = record.stepSeven.question4 || "";
        res.Weight_Loss_Medications__c = record.stepSeven.question5 || "No";
      }

      // stepEight is selected conditions
      if (record.stepEight) {
        res.Health_Conditions__c = (record.stepEight?.selectedConditions || [])
          .filter((c) => c !== "none")
          .join(";");
      }

      // stepNine is sms notification
      if (record.stepNine) {
        res.SMS_Opt_In__c =
          record.stepNine["SMS Notification"] !== "do-not-notify";
      }

      // stepTwo, stepThree and stepTen is the cart
      // check if any of the keys are found in the record
      if (record.stepTwo || record.stepThree || record.stepTen) {
        const main = record.stepTwo || {};
        const supplement = record.stepThree?.cart || {};
        const addon = record.stepTen?.addoncart || {};

        res.HealthFare_Cart_JSON__c = JSON.stringify({
          main,
          supplement,
          addon,
        });
      }
    } else {
      res = this.transformContact(record);
    }

    return res;
  }

  transformContact(record) {
    const birthDate = `${record.year}-${record.month}-${record.day}`;
    const healthFareUUID = [record.email, record.phone, birthDate].join("||");
    const streetAddresses = [record.streetAddress1, record.streetAddress2]
      .filter((s) => s)
      .join(", ");

    const mailingAddress = {
      MailingStreet: streetAddresses,
      MailingCity: record.city,
      MailingState: record.state,
      MailingPostalCode: record.zipCode,
      MailingCountry: "United States",
    };

    let otherAddress = {
      OtherStreet: streetAddresses,
      OtherCity: record.city,
      OtherState: record.state,
      OtherPostalCode: record.zipCode,
      OtherCountry: "United States",
    };

    // billing address is currently stored in other address
    if (
      record.billingCity ||
      record.billingState ||
      record.billingZipCode ||
      record.billingStreetAddress1 ||
      record.billingStreetAddress2
    ) {
      otherAddress = {
        OtherStreet: [
          record.billingStreetAddress1,
          record.billingStreetAddress2,
        ]
          .filter((s) => s)
          .join(", "),
        OtherCity: record.billingCity,
        OtherState: record.billingState,
        OtherPostalCode: record.billingZipCode,
        OtherCountry: "United States",
      };
    }

    return {
      Email: record.email,
      Phone: record.phone,
      FirstName: record.firstName,
      LastName: record.lastName,
      HealthFare_UUID__c: healthFareUUID,
      Birthdate: birthDate,
      ...mailingAddress,
      ...otherAddress,
      // Add other transformations as needed
    };
  }

  checkIfFloat(value, defaultValue = 0) {
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(value) ? num : defaultValue;
  }
}

export default new PatientService();
