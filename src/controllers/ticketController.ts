// src/controllers/userController.ts
import { Request, Response } from 'express';
import { Ticket } from '../types/ticket';
import ticketService from '../services/ticketService';

const ticketController = {
    async getAvailableSeats(req: Request, res: Response): Promise<void> {
      try {
        const { movieId, cinemaId, date, time } = req.body; 
        // Validate input
        if (!movieId || !cinemaId || !date || !time) {
          res.status(400).json({ error: 'All fields are required.' });
          return;
        }
  
        const result = await ticketService.getAvailableSeats(movieId, cinemaId, date, time);
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
export default ticketController;