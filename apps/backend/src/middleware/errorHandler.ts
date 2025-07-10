import { Request, Response } from 'express';

export interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  _error: AppError,
  _req: Request,
  res: Response
) => {
  const error = _error;
  console.error('Error:', error);

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: message,
    ...(process.env['NODE_ENV'] === 'development' && { stack: error.stack }),
  });
};
