"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permsHandler = void 0;
const send_1 = require("../utils/send");
const permsHandler = (mCmd) => {
    if (!mCmd.prodigeCommand)
        return false;
    if (mCmd.prodigeCommand.permissions && !mCmd.havePermissions) {
        send_1.sendError({ type: 'PERMISSION', data: mCmd });
        return false;
    }
    return true;
};
exports.permsHandler = permsHandler;
