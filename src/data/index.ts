import { exit } from 'node:process';
import db from '../config/db';
import colors from 'colors';

const clearDatabase = async () => {
  try {
    await db.sync({ force: true });
    console.log(colors.bgRed('Database cleared.'));
    exit(0);
  } catch (error) {
    console.error('Error:', error);
    exit(1);
  }
};

if(process.argv[2] === '--clear') {
  clearDatabase();
}
