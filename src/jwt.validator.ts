import { NextFunction, Request, Response } from 'express';
import { JwtService } from './jwt.service';

export class JwtValidator {
  private readonly service = new JwtService();


  /**
   * Extract token from header
   * @date 21/01/2023 - 20:02:16
   *
   * @private
   * @param {Request} req
   * @returns {(string | null)}
   */
  private getToken(req: Request): string | null {
    const token = req.headers[this.service.headerName]?.toString();
    if (token && token.split(' ')[0] === 'Bearer') {
      return token.split(' ')[1];
    }
    return null;
  }


  /**
   * Verify token using function as an express middleware
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {void}
   */
  verify(req: Request, res: Response, next: NextFunction): void {
    const token = this.getToken(req);
    const decoded = this.service.verifyToken(token)

    if (token && decoded) {
      (req as any).user = decoded.payload;
      return next();
    }
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized access - invalid token provided',
    });
  }
}
