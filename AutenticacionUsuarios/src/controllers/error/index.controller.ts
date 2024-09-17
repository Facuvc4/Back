import { Request, Response, NextFunction } from 'express';

const errorController = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.httpStatus || 500).send({
    code: err.code || 'INTERNAL_ERROR',
    message: err.message || 'Internal Server Error',
  });
};

export default errorController;
