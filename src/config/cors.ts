import { CorsOptions } from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const whiteList = [process.env.FRONTEND_URL as string];

if (process.argv.includes('--api')) {
  // Agrega undefined a la lista blanca si estás en modo desarrollo
  whiteList.push(undefined);
}

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};