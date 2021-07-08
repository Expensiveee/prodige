"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cooldownHandler = void 0;
const send_1 = require("../utils/send");
const cooldownHandler = (mCmd) => {
    var _a;
    if (!mCmd.prodigeCommand)
        return true;
    if (mCmd.cooldown && !mCmd.cooldownBypass) {
        send_1.sendError({ type: 'COOLDOWN', data: mCmd });
        return false;
    }
    if (mCmd.prodigeCommand.cooldown && !mCmd.cooldownBypass) {
        mCmd.client.cooldowns.set(`${mCmd.message.author.id}_${(_a = mCmd.prodigeCommand) === null || _a === void 0 ? void 0 : _a.name}`, Date.now() + mCmd.prodigeCommand.cooldown.delay);
        setTimeout(() => {
            var _a;
            mCmd.client.cooldowns.delete(`${mCmd.message.author.id}_${(_a = mCmd.prodigeCommand) === null || _a === void 0 ? void 0 : _a.name}`);
        }, mCmd.prodigeCommand.cooldown.delay);
    }
    return true;
};
exports.cooldownHandler = cooldownHandler;
