import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    logging: false,
    models: [__dirname + '/../models/**/*.model.ts'],
  }
);

export default db;
