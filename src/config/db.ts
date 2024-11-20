import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(process.env.POSTGRESQL_URI!, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  models: [__dirname + '/../models/**/*.ts'],
});

export default db;
