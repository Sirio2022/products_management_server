import express, { Express } from 'express';
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import productRoutes from './routes/productRoutes';
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
server.use(express.json());

// Enable CORS
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
server.use(cors(corsOptions));

server.use('/api/products', productRoutes);

export default server;
