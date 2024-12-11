import { db } from '../config/db';
import { Ticket } from '../types/ticket';

const ticketService = {
  async getAvailableSeats(movieId:number, cinemaId:number, date:string, time: string): Promise<Ticket[]> {
    const sql = `
        SELECT 
            s.seat_number, 
            s.status, 
            mc.show_time
        FROM 
            seats s
        JOIN 
            movie_cinemas mc ON s.movie_cinema_id = mc.id
        WHERE 
            s.status = 'available' 
            AND mc.movie_id = ? 
            AND mc.cinema_id = ? 
            AND DATE(mc.show_time) = ? 
            AND TIME(mc.show_time) = ?;
    `;
    const [rows] = await db.query(sql, [movieId, cinemaId, date, time]); 
    return rows as Ticket[];
  },
};

export default ticketService;
