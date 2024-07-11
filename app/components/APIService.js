class APIService {
  constructor() {
    this.baseURL = "https://healthfare-app-a323ab59bfbc.herokuapp.com";
  }

  async upsertPatient(patient) {
    return await this.post("/api/service/patients", patient);
  }

  async getProducts() {
    return await this.get("/api/service/products");
  }

  async createPaymentIntent(
    amount,
    currency,
    orderNumber,
    customerId,
    customerName
  ) {
    return await this.post("/api/service/payments", {
      amount,
      currency,
      orderNumber,
      customerId,
      customerName,
    });
  }

  async createSubscription(paymentRequest, type = "one-time") {
    return await this.post("/api/service/payments", {
      ...paymentRequest,
      type,
    });
  }

  async createBooking(booking) {
    return await this.post("/api/service/appointments", booking);
  }

  async createOrder(order) {
    return await this.post("/api/service/orders", order);
  }

  async getBookings(date) {
    let iso = date;
    if (date instanceof Date) {
      iso = date.toISOString().split("T")[0];
    }
    return await this.get("/api/service/appointments/" + iso);
  }

  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);
      if (!response.ok) {
        const errorRes = await this.getErrorResponse(response);
        throw new Error(errorRes.error || "Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error during GET request:", error);
      throw error;
    }
  }

  async post(endpoint, data) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorRes = await this.getErrorResponse(response);
        throw new Error(errorRes.error || "Network response was not ok");
      }
      const res = await response.json();
      console.log("APIResponse:", res);
      return res;
    } catch (error) {
      console.error("Error during POST request:", error);
      throw error;
    }
  }

  async getErrorResponse(response) {
    let res = {};
    try {
      res = await response.json();
    } catch (error) {}
    return res;
  }
}

export default new APIService();
