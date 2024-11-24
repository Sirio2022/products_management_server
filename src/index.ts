import server from './server';
import colors from 'colors';

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(
    colors.blue.bold(`Server is running on http://localhost:${PORT}`)
  );
});
