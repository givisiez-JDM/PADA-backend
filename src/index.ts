import 'dotenv/config';
import app from './app';
import { AppDataSource } from "./database/data-source";

const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(`Error during Data Source initialization: ${err}`));
