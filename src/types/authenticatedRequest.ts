import { Request } from 'express';
import { RowDataPacket } from 'mysql2';

export interface AuthenticatedRequest extends Request {
  user?: { id: number }; 
}

export interface DecodedToken {
  id: number;
}

export interface UserQueryResult extends RowDataPacket {
  id: number;
}