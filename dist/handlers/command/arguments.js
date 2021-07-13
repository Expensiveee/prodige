"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argsHandler = void 0;
const getMember_1 = require("../../utils/arguments/getMember");
const isNumber_1 = require("../../utils/arguments/isNumber");
const send_1 = require("../../utils/send");
const ChannelsType_1 = require("../../enums/ChannelsType");
const getMessage_1 = require("../../utils/arguments/getMessage");
const getChannel_1 = require("../../utils/arguments/getChannel");
const argsHandler = (mCmdExtended) => {
    var _a, _b;
    const { prodigeCommand, plainArgs, message, args } = mCmdExtended;
    if (!prodigeCommand)
        return false;
    //Putting all the required arguments first then the optional ones at th end
    (_a = prodigeCommand.args) === null || _a === void 0 ? void 0 : _a.sort((x, y) => {
        return x.required === y.required ? 0 : x.required ? -1 : 1;
    });
    if (!prodigeCommand.args || !plainArgs)
        return true;
    for (let i = 0; i < ((_b = prodigeCommand === null || prodigeCommand === void 0 ? void 0 : prodigeCommand.args) === null || _b === void 0 ? void 0 : _b.length); i++) {
        const { name, required, type, byDefault } = prodigeCommand.args[i];
        const arg = plainArgs[i];
        if (required && !arg) {
            send_1.sendError({
                type: 'ARGUMENT_REQUIRED',
                command: mCmdExtended,
                argument: prodigeCommand.args[i],
                client: mCmdExtended.client,
                message: mCmdExtended.message,
            });
            return false;
        }
        if (!arg) {
            args[name] = byDefault;
            return true;
        }
        //Checking the argument type and validity
        //Note that the argument wil be checked even when the arg exists and is optional
        //For example, if an argument of type: member is expected but optional.
        //The checking will run if the user gives an argument and will send an error message if this type isn't respected.
        //If nothing is given by the user nothing will happen and will send the byDefault value or undefined
        if (type == 'string') {
            args[name] = arg;
            continue;
        }
        else if (type == 'number') {
            if (isNumber_1.isNumber(arg)) {
                args[name] = parseFloat(arg);
                continue;
            }
        }
        else if (type == 'member') {
            const member = getMember_1.getMember(message, arg);
            if (member) {
                args[name] = member;
                continue;
            }
        }
        else if (type == 'message') {
            const msg = getMessage_1.getMessage(message, arg);
            if (msg) {
                args[name] = msg;
                continue;
            }
        }
        else if (type in ChannelsType_1.ProdigeChannelType) {
            const channel = getChannel_1.getChannel(message, arg, type);
            if (channel) {
                args[name] = channel;
                continue;
            }
        }
        send_1.sendError({
            type: 'ARGUMENT_WRONG_TYPE',
            command: mCmdExtended,
            argument: prodigeCommand.args[i],
            client: mCmdExtended.client,
            message: mCmdExtended.message,
        });
        return false;
    }
    return true;
};
exports.argsHandler = argsHandler;
