import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

export const LogRequest = (req: Request, res: Response, next: NextFunction) => {
  const logger = new Logger('LogRequest');

  const payload = JSON.stringify(req.body || req.params);

  logger.debug(`[${req.method}] path: ${req.path} ${payload}`);
  next();
};
