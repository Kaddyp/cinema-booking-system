// Import Stripe
import Stripe from 'stripe';
import 'dotenv/config';

// Get the Stripe secret key from environment variables
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

// Validate that the key is defined
if (!STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in the environment variables.");
}

// Initialize Stripe with the validated key
const stripe = new Stripe(STRIPE_SECRET_KEY);

export default stripe;