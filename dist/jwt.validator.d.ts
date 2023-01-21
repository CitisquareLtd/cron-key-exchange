import { NextFunction, Request, Response } from "express";
export declare class JwtValidator {
    private readonly service;
    private getToken;
    verify(req: Request, res: Response, next: NextFunction): void;
}
