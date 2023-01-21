import { Jwt, sign, verify } from 'jsonwebtoken';
export interface JwtOpts {
    privateKey?: string
    publicKey?: string
    issuer?: string,
    headerName?: string
}
export class JwtService {
    private readonly privateKey = process.env.CRON_PRIVATE_KEY || '';
    private readonly publicKey = process.env.CRON_PUBLIC_KEY || '';

    headerName = 'authorization'

    constructor(private readonly opts?: JwtOpts) {
        if (opts.privateKey) {
            this.privateKey = opts.privateKey;
        }

        if (opts.publicKey) {
            this.publicKey = opts.publicKey;
        }

        if (opts.headerName) {
            this.headerName = opts.headerName;
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
            issuer: this.opts.issuer,
            algorithm: 'RS256',
        });
    }


    /**
     * Verify jwt token
     *
     * @param {string} token
     * @returns {Jwt}
     */
    verifyToken(token: string,): Jwt {
        const jwt = verify(token, this.publicKey, {
            complete: true,
            issuer: this.opts.issuer,
        });
        return jwt;
    }
}
