import { CorsOptions } from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const corsConfig: CorsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
