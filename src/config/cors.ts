import { CorsOptions } from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};