import dotenv from 'dotenv';
import colors from 'colors';
import server from './server';

dotenv.config();

const PORT = process.env.BACKEND_PORT || 3000;

server.listen(PORT, () => {
  console.log(colors.cyan.underline(`Server running in port ${PORT}`));
});
