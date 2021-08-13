"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.botPermsHandler = void 0;
const send_1 = require("../../utils/send");
const botPermsHandler = (mCmd) => {
    if (!mCmd.prodigeCommand)
        return false;
    if (mCmd.prodigeCommand.botPermissions && !mCmd.haveRequiredBotPermissions) {
        send_1.sendError({
            type: 'BOT_PERMISSION',
            command: mCmd,
            client: mCmd.client,
            message: mCmd.message,
        });
        return false;
    }
    return true;
};
exports.botPermsHandler = botPermsHandler;
