import express, { Express } from 'express';
import colors from 'colors';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import { corsConfig } from './config/cors';
import dotenv from 'dotenv';

// Load environment variables
import db from './config/db';

dotenv.config();

// Connect to the database
async function connectToDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(
      colors.yellow.bold('Connection to DB has been established successfully.')
    );
  } catch (error) {
    console.error(colors.red.bold('Unable to connect to the database:'), error);
  }
}

connectToDB();

const server: Express = express();

// Enable CORS
server.use(cors(corsConfig));

server.use(express.json());

server.use('/api/products', productRoutes);

export default server;
