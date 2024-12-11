import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { DecodedToken, UserQueryResult  } from '../types/authenticatedRequest';
import 'dotenv/config';
import { db } from '../config/db';

// Middleware to authenticate token
export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    //const token = req.headers.authorization?.split(' ')[1]; // Extract token from header
    const token = req.cookies.token;
    //const token = req.header('Authorization');
    if (!token) {
      res.status(401).json({ error: 'Access denied' });
      return;
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '') as DecodedToken;
    // Query the database to verify the user exists
    const [rows] = await db.query(
      `SELECT * FROM User WHERE id = ?`,
      [decoded.id]
    );
    // Check if the user was found
    if ((rows as any[]).length === 0) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    // Attach user information to the request object
    (req as any).user = (rows as any[])[0];

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
