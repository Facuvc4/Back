import { NextFunction, Request, Response } from 'express';
import LoginService from '../../services/user/login.service';

const main = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const token = await LoginService(username, password);
    res
      .cookie('access_token', token, { httpOnly: true })
      .json({ message: 'Sesion iniciada' })
      .status(200);
  } catch (error) {
    next(error);
  }
};

export default main;
