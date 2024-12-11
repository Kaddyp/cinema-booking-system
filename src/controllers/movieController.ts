// src/controllers/userController.ts
import { Request, Response } from 'express';
import { Movie } from '../types/movie';
import movieService from '../services/movieService';

const movieController = {
    async getAllMovies(req: Request, res: Response): Promise<void> {
      try {
        const movies: Movie[] = await movieService.getAllMovies();
        res.status(200).json(movies);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies' });
      }
    },

    async getMovieById(req: Request, res: Response): Promise<void> {
      try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
          res.status(400).json({ error: 'Invalid movie ID' });
          return;
        }
  
        const movie = await movieService.getMovieById(id);
        if (movie) {
          res.status(200).json(movie);
        } else {
          res.status(404).json({ error: 'Movie not found' });
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ error: 'Failed to fetch movie' });
      }
    },

    async getMovieByIdShowTimes(req: Request, res: Response): Promise<void> {
      try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
          res.status(400).json({ error: 'Invalid movie ID' });
          return;
        }
  
        const movie = await movieService.getMovieByIdShowTimes(id);
        if (movie) {
          res.status(200).json(movie);
        } else {
          res.status(404).json({ error: 'Movie not found' });
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ error: 'Failed to fetch movie' });
      }
    },

    async getAvailableSeats(req: Request, res: Response): Promise<void> {
      try {
        const { movieId, cinemaId, date, time } = req.body; 
         console.log(movieId, cinemaId, date, time)
        // Validate input
        if (!movieId || !cinemaId || !date || !time) {
          res.status(400).json({ error: 'All fields are required.' });
          return;
        }
  
        const result = await movieService.getAvailableSeats(movieId, cinemaId, date, time);
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
export default movieController;