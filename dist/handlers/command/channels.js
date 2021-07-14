"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelsHandler = void 0;
const send_1 = require("../../utils/send");
const channelsHandler = (mCmd) => {
    if (!mCmd.prodigeCommand)
        return false;
    if (mCmd.prodigeCommand.channels && !mCmd.inAllowedChannel) {
        send_1.sendError({
            type: 'CHANNEL',
            command: mCmd,
            client: mCmd.client,
            message: mCmd.message,
        });
        return false;
    }
    return true;
};
exports.channelsHandler = channelsHandler;
