import { sign, verify } from 'jsonwebtoken';

export class JwtService {
  private readonly privateKey = process.env.CRON_PRIVATE_KEY || '';
  private readonly publicKey = process.env.CRON_PUBLIC_KEY || '';

  private readonly issuer = 'citisquare/cronjobs';

  constructor(privateKey?: string, publicKey?: string) {
    if (privateKey) {
      this.privateKey = privateKey;
    }

    if (publicKey) {
      this.publicKey = publicKey;
    }
  }

  /**
   * Generate jwt token, only private key can generate token
   *
   * @param {string} authId
   * @returns {string}
   */
  generateToken(authId: string): string {
    return sign({ authId }, this.privateKey, {
      expiresIn: 60 * 2,
      issuer: this.issuer,
      algorithm: 'RS256',
    });
  }

  verifyToken(token: string) {
    const jwt = verify(token, this.publicKey, {
      complete: true,
      issuer: this.issuer,
    });
    return jwt.payload;
  }
}
