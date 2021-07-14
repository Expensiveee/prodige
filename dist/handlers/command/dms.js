"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dmsHandler = void 0;
const send_1 = require("../../utils/send");
const dmsHandler = (mCmd) => {
    if (!mCmd.prodigeCommand)
        return false;
    if (mCmd.prodigeCommand.dmOnly && !mCmd.inDmChannel) {
        send_1.sendError({
            type: 'NOT_IN_DM',
            command: mCmd,
            client: mCmd.client,
            message: mCmd.message,
        });
        return false;
    }
    else if (mCmd.prodigeCommand.dmOnly == false && mCmd.inDmChannel) {
        send_1.sendError({
            type: 'NOT_IN_GUILD',
            command: mCmd,
            client: mCmd.client,
            message: mCmd.message,
        });
        return false;
    }
    return true;
};
exports.dmsHandler = dmsHandler;
