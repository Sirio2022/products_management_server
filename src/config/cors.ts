import { CorsOptions } from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const corsConfig: CorsOptions = {
  origin: 'https://products-management-client.vercel.app',
  optionsSuccessStatus: 200,
};
