import { NextFunction, Request, Response } from 'express';
import { JwtService } from './jwt.service';

export class JwtValidator {
  private readonly service = new JwtService();

  private getToken(req: Request): string | null {
    const token = req.headers['cron-token']?.toString();
    if (token && token.split(' ')[0] === 'Bearer') {
      return token.split(' ')[1];
    }
    return null;
  }

  verify(req: Request, res: Response, next: NextFunction) {
    const token = this.getToken(req);

    if (token && this.service.verifyToken(token)) {
      return next();
    }
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized access - invalid token provided',
    });
  }
}
