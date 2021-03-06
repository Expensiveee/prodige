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
const globalCooldown_1 = require("../handlers/command/globalCooldown");
const botPermissions_1 = require("../handlers/command/botPermissions");
exports.messageEvent = {
    name: 'messageCreate',
    run: async (client, message) => {
        var _a, _b, _c, _d, _e;
        if (client.config.allowBots == false && message.author.bot)
            return;
        //Defining an empty args object that will be
        const prefixes = client.getGuildPrefix((_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : '');
        const args = {};
        for (let i = 0; i < prefixes.length; i++) {
            //Getting the ProdigeMessageCommand object for all the handlers below
            const command = getCommand_1.getCommand(client, message, prefixes[i]);
            if (!command.prodigeCommand)
                continue;
            if (((_c = command.prodigeCommand) === null || _c === void 0 ? void 0 : _c.deleteMessage) &&
                !command.prodigeCommand.dmOnly &&
                !command.inDmChannel)
                message.delete();
            if (!dms_1.dmsHandler({ ...command }))
                return;
            if (((_d = command.prodigeCommand) === null || _d === void 0 ? void 0 : _d.dmOnly) != true &&
                command.message.channel.type != 'dm') {
                if (!channels_1.channelsHandler({ ...command }))
                    return;
                if (!permissions_1.permsHandler({ ...command }))
                    return;
                if (!botPermissions_1.botPermsHandler({ ...command }))
                    return;
                if (!roles_1.rolesHandler({ ...command }))
                    return;
            }
            if (!cooldowns_1.cooldownHandler({ ...command }))
                return;
            if (!globalCooldown_1.globalCooldownHandler({ ...command }))
                return;
            // Note the the argsHandler needs ExtendedProdigeMessageCommand not ProdigeMessageCommand
            if (!arguments_1.argsHandler({ args, ...command }))
                return;
            //Adding error handling if something don't go very well
            try {
                (_e = command.prodigeCommand) === null || _e === void 0 ? void 0 : _e.run({
                    client,
                    message,
                    args,
                    command: command.prodigeCommand,
                    prefix: prefixes[i],
                }).catch(error => {
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
            break;
        }
    },
};
