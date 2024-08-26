"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errormessage = errormessage;
function errormessage(res, status, messg) {
    res.status(status).json({
        message: messg
    });
}
