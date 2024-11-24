import { CorsOptions } from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const corsConfig: CorsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};
