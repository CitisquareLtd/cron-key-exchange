import { Request } from "express"
import { expressjwt } from "express-jwt"


export class JwtValidator {
    constructor(private readonly publicKey: string) {

    }

    verify = expressjwt({
        secret: this.publicKey,
        algorithms: ["RS256"],
        credentialsRequired: true,
        getToken: function fromHeader(req: Request) {
            if (
                req.headers.authorization &&
                req.headers.authorization.split(" ")[0] === "Bearer"
            ) {
                return req.headers.authorization.split(" ")[1];
            }
            return null;
        },
    });

}