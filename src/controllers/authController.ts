// src/controllers/userController.ts
import { Request, Response } from 'express';
import { User } from '../types/user';
import authService from '../services/authService';


const authController = {
    async register(req: Request, res: Response): Promise<void> {
      try {     
        const user: User[] = await authService.register(req.body);
        res.status(201).json(user);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create User' });
      }
    },

    async login(req: Request, res: Response): Promise<void> {
      try {
          const { email, password } = req.body;

          if (!email || !password) {
            res.status(400).json({ error: "Email and password are required" });
          }
  
          const { token, user } = await authService.login({ email, password });
          // Send JWT via an HTTP-only cookie
          res.cookie('token', token, {
            httpOnly: true,
            secure: true,         //process.env.NODE_ENV === 'production', // Set to true in production
            maxAge: 300000,       // 5 Minutes
            //sameSite: 'Strict',   // Helps protect against CSRF
          });
        res.status(200).send({message: 'Login successfully', token, user});
      } catch (error) {
        res.status(400).send({ message: error });
      } 
    },

    async logout(req: Request, res: Response): Promise<void> { 
      try {
        const userId = req.body.user?.id;    
        if (!userId) {
          res.status(401).json({ message: 'Unauthorized' });
          return;
        }    
        await authService.logout(userId);
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
      } catch (error) {
        res.status(500).json({ message: `Error during logout: ${error}` });
      }      
    },
};
export default authController;