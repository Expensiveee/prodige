"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cooldownHandler = void 0;
const send_1 = require("../utils/send");
const ms_1 = __importDefault(require("ms"));
const discord_js_1 = require("discord.js");
const cooldownHandler = (mCmd) => {
    var _a;
    if (!mCmd.prodigeCommand)
        return true;
    if (mCmd.cooldown && !mCmd.cooldownBypass) {
        send_1.send(new discord_js_1.MessageEmbed({
            title: `You will be able to execute this command in ${ms_1.default(mCmd.cooldown - Date.now())}`,
            color: mCmd.client.colors.RED,
        }), mCmd.message, mCmd.client, mCmd.prodigeCommand);
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
