/* eslint-disable no-unused-vars */
import express from 'express';
import logger from 'src/utils/logger/logger';

export default (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  logger.error({ ...err, stack: err.stack });
  res.status(500).send({ ...err, message: err.message });
};
