"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpMenu_1 = require("./../utils/helpMenu");
let menu;
exports.default = {
    name: 'help',
    args: [{ name: 'command', type: 'string' }],
    run: async ({ client, message, args, prefix }) => {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!args.command) {
            if (!menu)
                menu = helpMenu_1.helpMenu(client, prefix);
            message.reply({
                embeds: [
                    {
                        author: {
                            name: `Prefix: ${prefix}`,
                        },
                        title: 'Help Menu',
                        description: menu,
                        thumbnail: {
                            url: (_b = (_a = client.user) === null || _a === void 0 ? void 0 : _a.avatarURL()) !== null && _b !== void 0 ? _b : '',
                        },
                        footer: {
                            text: `Requested by: ${message.author.id}`,
                            icon_url: (_c = message.author.avatarURL({ dynamic: true })) !== null && _c !== void 0 ? _c : '',
                        },
                    },
                ],
            });
        }
        else {
            const commandCategory = (_d = client.commands.get(args.command)) === null || _d === void 0 ? void 0 : _d.category;
            const command = (_e = client.categories
                .get(commandCategory !== null && commandCategory !== void 0 ? commandCategory : '')) === null || _e === void 0 ? void 0 : _e.find(cmd => cmd.name === args.command);
            if (!command) {
                message.reply({
                    embeds: [
                        {
                            title: 'Command not found',
                            color: client.colors.RED,
                            footer: {
                                text: `Requested by: ${message.author.id}`,
                                icon_url: (_f = message.author.avatarURL({ dynamic: true })) !== null && _f !== void 0 ? _f : '',
                            },
                        },
                    ],
                });
            }
            else {
                const name = `**Name:** ${command === null || command === void 0 ? void 0 : command.name}\n`;
                const aliases = (command === null || command === void 0 ? void 0 : command.aliases)
                    ? `**Aliases:** ${command === null || command === void 0 ? void 0 : command.aliases.join(', ')}\n`
                    : '';
                const description = (command === null || command === void 0 ? void 0 : command.description)
                    ? `**Description:** ${command === null || command === void 0 ? void 0 : command.description}\n`
                    : '';
                const usage = (command === null || command === void 0 ? void 0 : command.usage) ? `**Usage:** ${prefix}${command === null || command === void 0 ? void 0 : command.usage}\n` : '';
                message.reply({
                    embeds: [
                        {
                            title: 'Informations',
                            description: name + aliases + description + usage,
                            color: client.colors.ORANGE,
                            footer: {
                                text: `Requested by: ${message.author.id}`,
                                icon_url: (_g = message.author.avatarURL({ dynamic: true })) !== null && _g !== void 0 ? _g : '',
                            },
                        },
                    ],
                });
            }
        }
    },
};
