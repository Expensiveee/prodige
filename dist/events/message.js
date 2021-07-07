"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const discord_js_1 = require("discord.js");
const getCommand_1 = require("../utils/getCommand");
const send_1 = require("../utils/send");
const argsHandler_1 = require("../handlers/argsHandler");
const permsHandler_1 = require("../handlers/permsHandler");
const rolesHandler_1 = require("../handlers/rolesHandler");
const channelsHandler_1 = require("../handlers/channelsHandler");
const cooldownHandler_1 = require("../handlers/cooldownHandler");
exports.event = {
    name: 'messageCreate',
    run: async (client, message) => {
        var _a, _b;
        //Defining an empty args object that will be
        const args = {};
        //Getting the ProdigeMessageCommand object for all the handlers below
        const command = getCommand_1.getCommand(client, message);
        if ((_a = command.prodigeCommand) === null || _a === void 0 ? void 0 : _a.deleteMessage)
            message.delete();
        if (!channelsHandler_1.channelsHandler({ ...command }))
            return;
        if (!permsHandler_1.permsHandler({ ...command }))
            return;
        if (!rolesHandler_1.rolesHandler({ ...command }))
            return;
        if (!cooldownHandler_1.cooldownHandler({ ...command }))
            return;
        // Note the the argsHandler needs ExtendedProdigeMessageCommand and not
        if (!argsHandler_1.argsHandler({ args, ...command }))
            return;
        //Adding error handling if something don't go very well
        try {
            (_b = command.prodigeCommand) === null || _b === void 0 ? void 0 : _b.run({ client, message, args, command: command.prodigeCommand }).catch(err => {
                return send_1.send(new discord_js_1.MessageEmbed({
                    author: { name: 'Error' },
                    title: '```' + err.message + '```',
                    description: '```' + err.stack + '```',
                    color: client.colors.RED,
                }), message, client, command.prodigeCommand);
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (err) {
            send_1.send(new discord_js_1.MessageEmbed({
                author: { name: 'Error' },
                title: '```' + err.message + '```',
                description: '```' + err.stack + '```',
                color: client.colors.RED,
            }), message, client, command.prodigeCommand);
        }
    },
};
