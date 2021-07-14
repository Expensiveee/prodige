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
const dms_1 = require("../handlers/command/dms");
exports.messageEvent = {
    name: 'messageCreate',
    run: async (client, message) => {
        var _a, _b, _c, _d, _e;
        //Defining an empty args object that will be
        const prefix = client.getGuildPrefix((_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : '');
        const args = {};
        //Getting the ProdigeMessageCommand object for all the handlers below
        const command = getCommand_1.getCommand(client, message);
        if (((_c = command.prodigeCommand) === null || _c === void 0 ? void 0 : _c.deleteMessage) &&
            !command.prodigeCommand.dmOnly &&
            !command.inDmChannel)
            message.delete();
        if (!dms_1.dmsHandler({ ...command }))
            return;
        if (((_d = command.prodigeCommand) === null || _d === void 0 ? void 0 : _d.dmOnly) != true) {
            console.log('Ran1');
            if (!channels_1.channelsHandler({ ...command }))
                return;
            console.log('Ran2');
            if (!permissions_1.permsHandler({ ...command }))
                return;
            console.log('Ran3');
            if (!roles_1.rolesHandler({ ...command }))
                return;
            console.log('Ran');
        }
        if (!cooldowns_1.cooldownHandler({ ...command }))
            return;
        // Note the the argsHandler needs ExtendedProdigeMessageCommand not ProdigeMessageCommand
        if (!arguments_1.argsHandler({ args, ...command }))
            return;
        //Adding error handling if something don't go very well
        try {
            (_e = command.prodigeCommand) === null || _e === void 0 ? void 0 : _e.run({ client, message, args, command: command.prodigeCommand, prefix }).catch(error => {
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
