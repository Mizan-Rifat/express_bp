import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import routes from './routes';
import { DatabaseService } from './services/database.service';
import { RedisService } from './services/redis.service';

const app = express();
const PORT = process.env.APP_PORT || 3000;

const dbService = DatabaseService.getInstance();
const redisService = RedisService.getInstance();

(async () => {
  try {
    await dbService.connect();
    await redisService.connect();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', routes);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
})();
