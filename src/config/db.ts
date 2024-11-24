import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import 'reflect-metadata';  // Add this line. It's required by sequelize-typescript
import pg from 'pg';

dotenv.config();

const db = new Sequelize(process.env.POSTGRESQL_URI!, {
  dialect: 'postgres',
  dialectModule: pg,
  protocol: 'postgres',
  logging: false,
  models: [__dirname + '/../models/*.model.ts'],
});

export default db;
