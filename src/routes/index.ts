import express from 'express';
import userRouter from '../modules/users/user.route';
import appRouter from '../modules/app/app.route';

const router = express.Router();

router.use('/users', userRouter);
router.use('/app', appRouter);

export default router;
