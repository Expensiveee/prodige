"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelsHandler = void 0;
const discord_js_1 = require("discord.js");
const send_1 = require("../utils/send");
const channelsHandler = (mCmd) => {
    if (!mCmd.prodigeCommand)
        return false;
    if (mCmd.prodigeCommand.channels && !mCmd.allowedChannel) {
        send_1.send(new discord_js_1.MessageEmbed({
            title: 'You can\'t execute commands here',
            color: mCmd.client.colors.RED,
        }), mCmd.message, mCmd.client, mCmd.prodigeCommand);
        return false;
    }
    return true;
};
exports.channelsHandler = channelsHandler;
