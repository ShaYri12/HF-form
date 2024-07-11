import salesforceService from "./salesforce.service.js";
import encryptionService from "./encryption.service.js";
import { DateTime } from "luxon";

class AppointmentService {
  durationInMinutes = 15;
  dayStartTime = "08:00";
  dayEndTime = "17:00";
  timezone = "America/Los_Angeles";
  maxPerSlot = 5;

  async bookAppointment(uuid, slot) {
    console.log("Booking appointment for slot:", slot, "with UUID:", uuid);
    if (!slot.date && slot.startDt) {
      slot.date = slot.startDt.split("T")[0];
    }

    const slots = await this.findAvailableSlots(slot.date);
    const zonedStartDateTime = DateTime.fromFormat(
      `${slot.date}T${slot.start}`,
      "yyyy-MM-dd'T'HH:mm",
      { zone: this.timezone }
    );

    const zonedEndDateTime = DateTime.fromFormat(
      `${slot.date}T${slot.end}`,
      "yyyy-MM-dd'T'HH:mm",
      { zone: this.timezone }
    );

    slot.startDt = zonedStartDateTime;
    slot.endDt = zonedEndDateTime;

    const isSlotAvailable = slots.every((s) => {
      const slotStartTime = slot.startDt.toMillis();
      const slotEndTime = slot.endDt.toMillis();
      const sStartTime = s.startDt.toMillis();
      const sEndTime = s.endDt.toMillis();

      const isIntersecting =
        slotStartTime < sEndTime && sStartTime < slotEndTime;
      return !(isIntersecting && !s.available);
    });

    if (!isSlotAvailable) {
      console.log("No available slot found that matches the criteria.");
      throw new Error("Slot not available");
    }

    const connection = salesforceService.getConnection();
    // const healthFareUUID = encryptionService.decrypt(uuid);
    const healthFareUUID = uuid;
    const contact = await connection.sobject("Contact").findOne({
      HealthFare_UUID__c: healthFareUUID,
    });

    if (!contact) {
      throw new Error("Contact not found");
    } else {
      const event = {
        StartDateTime: slot.startDt.toISO(),
        EndDateTime: slot.endDt.toISO(),
        Subject: "Appointment",
        WhoId: contact.Id,
      };

      let result;

      if (slot.booking) {
        event.id = slot.booking.id;
        result = await connection.sobject("Event").update(event);
      } else {
        result = await connection.sobject("Event").create(event);
      }

      return result;
    }
  }

  async findAvailableSlots(date) {
    const zonedStartDate = DateTime.fromFormat(`${date}`, "yyyy-MM-dd", {
      zone: this.timezone,
    });
    const filterStartDate = zonedStartDate.toFormat(
      `yyyy-MM-dd'T'${this.dayStartTime}:00ZZ`
    );
    const filterEndDate = zonedStartDate.toFormat(
      `yyyy-MM-dd'T'${this.dayEndTime}:00ZZ`
    );

    const connection = salesforceService.getConnection();
    const query = `SELECT Id, StartDateTime, EndDateTime FROM Event WHERE StartDateTime >= ${filterStartDate} AND EndDateTime <= ${filterEndDate}`;
    const appointments = await connection.query(query);
    const slots = this.getAllSlots(date);

    slots.forEach((slot) => {
      slot.available = true;
      let appointmentCount = 0;

      appointments.records.forEach((appointment) => {
        if (
          DateTime.fromISO(slot.startDt.toISO()) <
            DateTime.fromISO(appointment.EndDateTime) &&
          DateTime.fromISO(appointment.StartDateTime) <
            DateTime.fromISO(slot.endDt.toISO())
        ) {
          appointmentCount++;
        }
      });

      if (appointmentCount >= this.maxPerSlot) {
        slot.available = false;
      }
      slot.appointmentCount = appointmentCount;
    });

    return slots;
  }

  getAllSlots(date) {
    const slots = [];
    let currentTime = DateTime.fromFormat(
      `${date}T${this.dayStartTime}`,
      "yyyy-MM-dd'T'HH:mm",
      { zone: this.timezone }
    );
    const endTime = DateTime.fromFormat(
      `${date}T${this.dayEndTime}`,
      "yyyy-MM-dd'T'HH:mm",
      { zone: this.timezone }
    );

    while (currentTime < endTime) {
      const slotEndTime = currentTime.plus({ minutes: this.durationInMinutes });
      slots.push({
        start: currentTime.toFormat("HH:mm"),
        end: slotEndTime.toFormat("HH:mm"),
        startDt: currentTime,
        endDt: slotEndTime,
      });
      currentTime = slotEndTime;
    }

    return slots;
  }
}

export default new AppointmentService();
