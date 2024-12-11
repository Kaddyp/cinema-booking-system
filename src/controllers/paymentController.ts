import { Request, Response } from 'express';
import { Payment } from '../types/payment';
import paymentService from '../services/paymentService';

const paymentController = {
    async createPayment(req: Request, res: Response): Promise<void> {
      try {
        const { amount } = req.body;
        // Validate input
        if (!amount) {
          res.status(400).json({ error: 'All fields are required.' });
          return;
        }
  
        const result = await paymentService.createPayment(amount);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ error: 'Result not found' });
        }
      } catch (error) {
        console.error('Error fetching data of available seats:', error);
        res.status(500).json({ error: 'Failed to fetch data of available seats' });
      }
    },
};
export default paymentController;