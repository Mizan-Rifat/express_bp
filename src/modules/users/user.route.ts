import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

const userController = new UserController();

router.use((req, res, next) => {
  console.log('user routes');

  next();
});

router
  .route('/')
  .get(userController.getAllUsers.bind(userController))
  .post((req, res) => {
    res.send(req.body);
  })
  .put((req, res) => {
    res.send('Got a PUT request');
  })
  .delete((req, res) => {
    res.send('Got a DELETE request');
  });

router.get('/:id', (req, res) => {
  res.send(req.params);
});

export default router;
