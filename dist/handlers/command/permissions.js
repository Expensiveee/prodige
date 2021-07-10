"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permsHandler = void 0;
const send_1 = require("../../utils/send");
const permsHandler = (mCmd) => {
    if (!mCmd.prodigeCommand)
        return false;
    if (mCmd.prodigeCommand.ownerOnly && !mCmd.isAllowed) {
        send_1.sendError({
            type: 'OWNER_ONLY',
            command: mCmd,
            client: mCmd.client,
            message: mCmd.message,
        });
        return false;
    }
    else if (mCmd.prodigeCommand.permissions && !mCmd.havePermissions) {
        send_1.sendError({
            type: 'PERMISSION',
            command: mCmd,
            client: mCmd.client,
            message: mCmd.message,
        });
        return false;
    }
    return true;
};
exports.permsHandler = permsHandler;
