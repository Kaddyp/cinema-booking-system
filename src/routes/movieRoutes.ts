import express from 'express';
import movieController from '../controllers/movieController';

const router = express.Router();

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);
router.get('/:id/showTimes', movieController.getMovieByIdShowTimes); 

export default router;