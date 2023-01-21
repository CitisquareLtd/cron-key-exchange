"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var JwtService = /** @class */ (function () {
    function JwtService(privateKey, publicKey) {
        this.privateKey = process.env.CRON_PRIVATE_KEY || "";
        this.publicKey = process.env.CRON_PUBLIC_KEY || "";
        this.issuer = 'citisquare/cronjobs';
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
    JwtService.prototype.generateToken = function (authId, expiresIn) {
        if (expiresIn === void 0) { expiresIn = '2m'; }
        return (0, jsonwebtoken_1.sign)({ authId: authId }, this.privateKey, {
            expiresIn: expiresIn,
            issuer: this.issuer,
            algorithm: 'RS256',
        });
    };
    JwtService.prototype.verifyToken = function (token) {
        var jwt = (0, jsonwebtoken_1.verify)(token, this.publicKey, {
            complete: true,
            issuer: this.issuer,
        });
        return jwt.payload;
    };
    return JwtService;
}());
exports.JwtService = JwtService;
