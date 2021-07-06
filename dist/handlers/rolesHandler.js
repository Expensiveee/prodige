"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesHandler = void 0;
const discord_js_1 = require("discord.js");
const send_1 = require("../utils/send");
const rolesHandler = (mCmd) => {
    if (!mCmd.prodigeCommand)
        return false;
    if (mCmd.prodigeCommand.roles && !mCmd.haveRoles) {
        send_1.send(new discord_js_1.MessageEmbed({
            title: 'You don\'t have the required roles to execute this command',
            color: mCmd.client.colors.RED,
        }), mCmd.message, mCmd.client, mCmd.prodigeCommand);
        return false;
    }
    return true;
};
exports.rolesHandler = rolesHandler;
