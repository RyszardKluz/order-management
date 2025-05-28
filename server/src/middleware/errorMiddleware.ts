import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

type ErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

const errorHandler: ErrorHandler = (err, req, res, next): void => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: true,
    message: message,
    ok: false,
  });
};

export default errorHandler;
