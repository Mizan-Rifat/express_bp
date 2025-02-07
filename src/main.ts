import express, { Request, Response } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import routes from './routes';
import { DatabaseService } from './services/database.service';
import { RedisService } from './services/redis.service';
import { RabbitMQService } from './services/rabbitmq.service';

const app = express();
const PORT = process.env.APP_PORT || 3000;

const dbService = DatabaseService.getInstance();
const redisService = RedisService.getInstance();
const rabbitMQService = RabbitMQService.getInstance();

(async () => {
  try {
    await dbService.connect();
    await redisService.connect();
    await rabbitMQService.connect();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', routes);

    app.post('/publish', async (req: Request, res: Response) => {
      const { exchange, type, routingKey, message } = req.body;

      try {
        rabbitMQService.publishExchange(exchange, type, routingKey, message);
        res.status(200).json({ message: `Message sent to ${exchange}` });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    });

    // Example route to consume messages from RabbitMQ
    app.get('/consume', async (req: Request, res: Response) => {
      const queueMap = {
        fanout: 'fanout_queue',
        direct: 'direct_queue',
        topic: 'topic_queue'
      };
      const { exchange, type, routingKey, message } = req.body;

      try {
        //@ts-ignore
        rabbitMQService.consumeExchange(exchange, queueMap[type], 'fanout', routingKey, msg => {
          console.log({ msg });
        });

        res.status(200).json({ message: `Consuming messages from queue` });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
})();
