"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtValidator = void 0;
var jwt_service_1 = require("./jwt.service");
var JwtValidator = /** @class */ (function () {
    function JwtValidator() {
        this.service = new jwt_service_1.JwtService();
    }
    JwtValidator.prototype.getToken = function (req) {
        var _a;
        var token = (_a = req.headers['cron-token']) === null || _a === void 0 ? void 0 : _a.toString();
        if (token &&
            token.split(" ")[0] === "Bearer") {
            return token.split(" ")[1];
        }
        return null;
    };
    JwtValidator.prototype.verify = function (req, res, next) {
        var token = this.getToken(req);
        if (token && this.service.verifyToken(token)) {
            return next();
        }
        res.status(401).json({
            status: 'error',
            message: 'Unauthorized access - invalid token provided',
        });
    };
    return JwtValidator;
}());
exports.JwtValidator = JwtValidator;
