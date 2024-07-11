import appointmentService from "./app/services/appointment.service.js";
import encryptionService from "./app/services/encryption.service.js";

async function test() {
  const date = "2022-01-01";
  const slots = await appointmentService.findAvailableSlots(date);
  console.log(slots);
}

async function encrypt() {
  const text = "Hello, World!";
  const encrypted = encryptionService.encrypt(text);
  console.log(encrypted);
  const decrypted = encryptionService.decrypt(encrypted);
  console.log(decrypted);
}

async function book() {
  const uuid = "John@John.com-(123) 123-1231";
  const slot = {
    date: "2022-06-22",
    start: "09:00",
    end: "09:15",
  };
  const result = await appointmentService.bookAppointment(
    encryptionService.encrypt(uuid),
    slot
  );
  console.log(result);
}

book();

//encrypt();

//test();
