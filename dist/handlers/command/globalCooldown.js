"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalCooldownHandler = void 0;
const send_1 = require("../../utils/send");
const globalCooldownHandler = (mCmd) => {
    var _a, _b, _c;
    if (!mCmd.prodigeCommand)
        return true;
    if (mCmd.globalCooldown) {
        send_1.sendError({
            type: 'GLOBAL_COOLDOWN',
            command: mCmd,
            client: mCmd.client,
            message: mCmd.message,
        });
        return false;
    }
    if (mCmd.prodigeCommand.globalCooldown) {
        const id = (_b = (_a = mCmd.message.guild) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : mCmd.message.channel.id;
        mCmd.client.globalCooldowns.set(`${id}_${(_c = mCmd.prodigeCommand) === null || _c === void 0 ? void 0 : _c.name}`, Date.now() + mCmd.prodigeCommand.globalCooldown);
        setTimeout(() => {
            var _a;
            mCmd.client.globalCooldowns.delete(`${id}_${(_a = mCmd.prodigeCommand) === null || _a === void 0 ? void 0 : _a.name}`);
        }, mCmd.prodigeCommand.globalCooldown);
    }
    return true;
};
exports.globalCooldownHandler = globalCooldownHandler;
