import express from 'express';
import authController from '../controllers/authController';
import {authenticateToken} from '../middlewares/authMiddleware';
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authenticateToken, authController.logout); 


export default router;