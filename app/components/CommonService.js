class CommonService {
  constructor() {
    this.name = "CommonService";
  }

  transform(formValues) {
    const contact = this.transformContact(formValues.stepSix);

    return {
      contact,
    };
  }

  transformContact(record) {
    const birthDate = `${record.year}-${record.month}-${record.day}`;
    const healthFareUUID = [record.email, record.phone, birthDate].join("||");

    return {
      Email: record.email,
      Phone: record.phone,
      FirstName: record.firstName,
      LastName: record.lastName,
      MailingStreet: record.streetAddress,
      MailingCity: record.city,
      MailingState: record.state,
      MailingPostalCode: record.zipCode,
      HealthFare_UUID__c: healthFareUUID,
      Birthdate: birthDate,
    };
  }
}

export default new CommonService();
