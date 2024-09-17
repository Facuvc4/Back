import express from 'express';
import {
  RegisterController,
  LoginController,
} from '../controllers/index.controller';

const userRouter = express.Router();

userRouter.post('/register', RegisterController);
userRouter.post('/login', LoginController);

export default userRouter;
