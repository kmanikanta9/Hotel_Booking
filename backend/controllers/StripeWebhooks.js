// controllers/bookingController.js
import Booking from "../models/Booking.js";
import stripePackage from "stripe";

const stripe = new stripePackage(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata.bookingId;

    try {
      const booking = await Booking.findById(bookingId);
      if (booking) {
        booking.isPaid = true;
        booking.paymentMethod = "Card";
        booking.status = "confirmed";
        await booking.save();
        console.log("Booking marked as paid:", bookingId);
      }
    } catch (err) {
      console.error("Webhook DB update error:", err.message);
    }
  }

  res.json({ received: true });
};
