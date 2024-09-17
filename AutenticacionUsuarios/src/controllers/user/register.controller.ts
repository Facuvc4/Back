import { NextFunction, Request, Response } from 'express';
import RegisterService from '../../services/user/register.service';

const main = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.password.length < 8) throw new Error('Password too short');
    const { username, password } = req.body;
    await RegisterService(username, password);
    res.send('Registro completado con exito').status(200);
  } catch (error) {
    next(error);
  }
};

export default main;
