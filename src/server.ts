import express, { Express } from 'express';
import colors from 'colors';
import productRoutes from './routes/productRoutes';

import db from './config/db';

// Connect to the database
async function connectToDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.yellow.bold('Connection to DB has been established successfully.'));
  } catch (error) {
    console.error(colors.red.bold('Unable to connect to the database:'), error);
  }
}

connectToDB();

const server: Express = express();
server.use(express.json());

server.use('/api/products', productRoutes);

export default server;
