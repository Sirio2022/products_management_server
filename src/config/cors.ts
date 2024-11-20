import { CorsOptions } from 'cors';
import dotenv from 'dotenv';

dotenv.config();
export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    //console.log(origin); // Here we can see the origin of the request. In this case, it's the postman request. And the origin is undefined.

    const whiteList = [process.env.FRONTEND_URL as string];

    if (process.argv[2] === '--api') {
      // This is a way to check if we are in development mode or production mode. If we are in development mode, we will add undefined to the whiteList array.
      whiteList.push(undefined);
    }

    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
