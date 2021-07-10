"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesHandler = void 0;
const send_1 = require("../../utils/send");
const rolesHandler = (mCmd) => {
    if (!mCmd.prodigeCommand)
        return false;
    if (mCmd.prodigeCommand.roles && !mCmd.haveRoles) {
        send_1.sendError({
            type: 'ROLE',
            command: mCmd,
            client: mCmd.client,
            message: mCmd.message,
        });
        return false;
    }
    return true;
};
exports.rolesHandler = rolesHandler;
