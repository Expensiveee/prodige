"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permsHandler = void 0;
const discord_js_1 = require("discord.js");
const send_1 = require("../utils/send");
const permsHandler = (mCmd) => {
    if (!mCmd.prodigeCommand)
        return false;
    if (mCmd.prodigeCommand.permissions && !mCmd.havePermissions) {
        send_1.send(new discord_js_1.MessageEmbed({
            title: 'You don\'t have the required permissions to execute this command',
            color: mCmd.client.colors.RED,
        }), mCmd.message, mCmd.client, mCmd.prodigeCommand);
        return false;
    }
    return true;
};
exports.permsHandler = permsHandler;
