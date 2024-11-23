import { CorsOptions } from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const whitelist = [process.env.FRONTEND_URL!];

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin!)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
