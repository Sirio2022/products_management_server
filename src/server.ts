import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import productRoutes from './routes/productRoutes';
import db from './config/db';

dotenv.config();

// Connect to database
export async function connectToDatabase() {
  try {
    await db.authenticate();
    db.sync();
    console.log(
      colors.rainbow('Connection to DB has been established successfully.')
    );
  } catch (error) {
    console.error(colors.red.bold('Unable to connect to the database:'), error);
  }
}

connectToDatabase();

const server: express.Application = express();
server.use(express.json());

// Enable CORS
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    //console.log(origin); // Here we can see the origin of the request. In this case, it's the postman request. And the origin is undefined.

    const whiteList = [process.env.FRONTEND_URL as string];

    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
server.use(cors(corsOptions));

// Morgan
server.use(morgan('dev'));

// Routes
server.use('/api/products', productRoutes);

export default server;
