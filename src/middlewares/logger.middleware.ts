import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger = new Logger();
  constructor() {}
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url: url } = req;
    const reqTime = new Date().getTime();
    res.on('finish', () => {
      const { statusCode } = res;
      const resTime = new Date().getTime();
      if (statusCode === 201 || statusCode === 200) {
        this.logger.log(
          `${method} ${url} ${statusCode} - ${resTime - reqTime}`,
        );
      }
      
    });
    next();
  }
}
