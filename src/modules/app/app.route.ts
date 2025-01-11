import express from 'express';
import { AppController } from './app.controller';

const router = express.Router();

const appController = new AppController();

router.use((req, res, next) => {
  console.log('app routes');

  next();
});

router.route('/').get(appController.find.bind(appController));

export default router;
