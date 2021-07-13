"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageEvent = void 0;
const getCommand_1 = require("../utils/getCommand");
const send_1 = require("../utils/send");
const arguments_1 = require("../handlers/command/arguments");
const permissions_1 = require("../handlers/command/permissions");
const roles_1 = require("../handlers/command/roles");
const channels_1 = require("../handlers/command/channels");
const cooldowns_1 = require("../handlers/command/cooldowns");
exports.messageEvent = {
    name: 'messageCreate',
    run: async (client, message) => {
        var _a, _b, _c, _d;
        //Defining an empty args object that will be
        const prefix = client.getGuildPrefix((_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : '');
        const args = {};
        //Getting the ProdigeMessageCommand object for all the handlers below
        const command = getCommand_1.getCommand(client, message);
        if ((_c = command.prodigeCommand) === null || _c === void 0 ? void 0 : _c.deleteMessage)
            message.delete();
        if (!channels_1.channelsHandler({ ...command }))
            return;
        if (!permissions_1.permsHandler({ ...command }))
            return;
        if (!roles_1.rolesHandler({ ...command }))
            return;
        if (!cooldowns_1.cooldownHandler({ ...command }))
            return;
        // Note the the argsHandler needs ExtendedProdigeMessageCommand and not
        if (!arguments_1.argsHandler({ args, ...command }))
            return;
        //Adding error handling if something don't go very well
        try {
            (_d = command.prodigeCommand) === null || _d === void 0 ? void 0 : _d.run({ client, message, args, command: command.prodigeCommand, prefix }).catch(error => {
                send_1.sendError({
                    type: 'EXECUTION',
                    command,
                    error,
                    message: command.message,
                    client: client,
                });
            });
        }
        catch (error) {
            send_1.sendError({
                type: 'EXECUTION',
                command,
                error,
                message: command.message,
                client: client,
            });
        }
    },
};
