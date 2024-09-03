import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();
const db = new Sequelize(process.env.POSTGRESQL_URI!, {
  models: [__dirname + '/../models/**/*'],
});

export default db;
