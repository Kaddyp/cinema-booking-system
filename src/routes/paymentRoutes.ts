import express from 'express';
import paymentController from '../controllers/paymentController';

const router = express.Router();

router.post('/create-payment-intent', paymentController.createPayment); 

export default router;