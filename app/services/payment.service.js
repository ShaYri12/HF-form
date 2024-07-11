// payments.service.js
import Stripe from "stripe";
import { config } from "dotenv";

config();

class PaymentService {
  constructor() {
    // Initialize Stripe with your secret key
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async createPaymentIntent(
    amount,
    currency = "usd",
    orderNumber,
    customerId,
    customerName
  ) {
    try {
      console.log("Creating payment intent:", amount, currency, orderNumber);
      // Create a PaymentIntent with the given amount, currency, and metadata
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        metadata: {
          orderNumber: orderNumber,
          customerId: customerId,
          customerName: customerName,
        },
        // Add any additional parameters here
      });
      return paymentIntent;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw error;
    }
  }

  async createSubscription(paymentRequest) {
    const { customer, products, paymentMethod, metadata } = paymentRequest;

    const stripeCustomer = await this.stripe.customers.create({
      email: customer.email,
      name: customer.name,
      payment_method: paymentMethod,
      invoice_settings: {
        default_payment_method: paymentMethod,
      },
    });

    console.log("customer created", metadata);

    const stripeSubscription = await this.stripe.subscriptions.create({
      customer: stripeCustomer.id,
      items: products.map((product) => ({
        price: product.priceId,
      })),
      payment_settings: {
        payment_method_options: {
          card: {
            request_three_d_secure: "any",
          },
        },
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },

      expand: ["latest_invoice.payment_intent"],
      metadata: metadata,
    });

    return {
      customer: stripeCustomer,
      subscription: stripeSubscription,
      subscriptionId: stripeSubscription.id,
      clientSecret:
        stripeSubscription.latest_invoice.payment_intent.client_secret,
    };
  }
}

export default new PaymentService();
