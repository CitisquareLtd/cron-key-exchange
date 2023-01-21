export declare class JwtService {
    private readonly privateKey;
    private readonly publicKey;
    private readonly issuer;
    constructor(privateKey?: string, publicKey?: string);
    /**
   * Generate jwt token, only private key can generate token
   *
   * @param {string} authId
   * @returns {string}
   */
    generateToken(authId: string, expiresIn?: string): string;
    verifyToken(token: string): string | import("jsonwebtoken").JwtPayload;
}
