import Stripe from 'stripe';
import  stripe from '../utils/config';
import { db } from '../config/db';
import { Payment } from '../types/payment';

const paymentService = {
  async createPayment(amount:number): Promise<Payment | null> {
    // Create a Payment Intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // Stripe requires amounts in cents
        currency: 'gbp',     
        automatic_payment_methods: { enabled: true },
         //payment_method_types: ['card', 'link'],
    });
    const rows = {
        clientSecret: paymentIntent.client_secret,
        id: paymentIntent.id,
    }; 
    return rows || null;
  },
};


export default paymentService;
