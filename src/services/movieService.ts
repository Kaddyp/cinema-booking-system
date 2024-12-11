import { db } from '../config/db';
import { Movie } from '../types/movie';

const movieService = {
  /*** Get all movies*/
  async getAllMovies(): Promise<Movie[]> {
    const [rows] = await db.query(`SELECT * FROM movies;`);
    return rows as Movie[];
  },
  /*** Get movies by id*/
  async getMovieById(id: number): Promise<Movie | null> {
    const [rows] = await db.query(`SELECT * FROM movies WHERE id = ?;`, [id]);
    const movie = (rows as Movie[])[0];
    return movie || null;
  },
  /*** Get movies by id and showTimes*/
  async getMovieByIdShowTimes(id: number): Promise<Movie[]> {
    const sql = `
        SELECT c.id AS cinema_id, c.name AS cinema_name, mc.show_time
        FROM cinemas c
        JOIN movie_cinemas mc ON c.id = mc.cinema_id
        WHERE mc.movie_id = ?;
    `;
    const [rows] = await db.query(sql, [id]); 
    return rows as Movie[];
  },

  async getAvailableSeats(movieId:number, cinemaId:number, date:any, time: any): Promise<Movie[]> {
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
    return rows as Movie[];
  },
};

export default movieService;
