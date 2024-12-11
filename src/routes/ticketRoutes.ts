import express from 'express';
import ticketController from '../controllers/ticketController';

const router = express.Router();

router.post('/seat-picker', ticketController.getAvailableSeats); 

export default router;