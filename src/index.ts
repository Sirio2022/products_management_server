import server from './server';
import colors from 'colors';
import 'sequelize';

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(
    colors.blue.bold(`Server is running on http://localhost:${PORT}`)
  );
});
