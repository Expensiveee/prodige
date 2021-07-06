"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argsHandler = void 0;
const getMember_1 = require("../utils/getMember");
const isNumber_1 = require("../utils/isNumber");
const send_1 = require("../utils/send");
const getChannel_1 = require("../utils/getChannel");
const discord_js_1 = require("discord.js");
const ChannelsType_1 = require("../enums/ChannelsType");
const argsHandler = ({ prodigeCommand, plainArgs, commandName, message, client, args, }) => {
    var _a, _b;
    if (!prodigeCommand)
        return false;
    (_a = prodigeCommand.args) === null || _a === void 0 ? void 0 : _a.sort((x, y) => {
        return x.required === y.required ? 0 : x.required ? -1 : 1;
    });
    if (!prodigeCommand.args || !plainArgs)
        return true;
    for (let i = 0; i < ((_b = prodigeCommand === null || prodigeCommand === void 0 ? void 0 : prodigeCommand.args) === null || _b === void 0 ? void 0 : _b.length); i++) {
        const { name, required, type, byDefault } = prodigeCommand.args[i];
        const arg = plainArgs[i];
        if (required && !arg) {
            const argsString = prodigeCommand.args
                .map((a) => (a.required ? `[${a.name}]` : `(${a.name})`))
                .join(' ');
            send_1.send(new discord_js_1.MessageEmbed({
                author: { name: 'Syntax: [] = required, () = optional.' },
                description: `**${name}** is required`,
                fields: [
                    {
                        name: 'Usage',
                        value: `\`\`\`${client.config.prefix}${commandName} ${argsString} \`\`\``,
                        inline: true,
                    },
                ],
                color: client.colors.RED,
            }), message, client, prodigeCommand);
            return false;
        }
        if (!arg) {
            args[name] = byDefault;
            return true;
        }
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
        else if (type in ChannelsType_1.ProdigeChannelType) {
            const channel = getChannel_1.getChannel(message, arg, type);
            if (channel) {
                args[name] = channel;
                continue;
            }
        }
        send_1.send(new discord_js_1.MessageEmbed({
            title: `\`\`\` ${name} \`\`\` must be a \`\`\` ${Object.values(ChannelsType_1.ProdigeChannelType).includes(type) ? `${type}Channel` : type} \`\`\``,
        }), message, client, prodigeCommand);
        return false;
    }
    return true;
};
exports.argsHandler = argsHandler;
