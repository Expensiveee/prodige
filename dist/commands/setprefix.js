"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'setprefix',
    category: '⚙️ Configuration',
    description: 'Change the actual prefix for this server',
    usage: 'setprefix [prefix]',
    permissions: ['ADMINISTRATOR', 'MANAGE_GUILD'],
    args: [{ name: 'prefix', type: 'string', required: true }],
    run: async ({ client, message, args }) => {
        var _a;
        const { prefix } = args;
        client.setPrefix((_a = message.guild) === null || _a === void 0 ? void 0 : _a.id, prefix).then(({ success }) => {
            var _a, _b;
            if (success) {
                message.channel.send({
                    embeds: [
                        {
                            title: `Prefix set to \`\`${prefix}\`\``,
                            color: client.colors.GREEN,
                            footer: {
                                text: `Requested by: ${message.author.id}`,
                                icon_url: (_a = message.author.avatarURL({ dynamic: true })) !== null && _a !== void 0 ? _a : '',
                            },
                        },
                    ],
                });
            }
            else {
                message.channel.send({
                    embeds: [
                        {
                            title: 'An unknown error has occured',
                            color: client.colors.RED,
                            footer: {
                                text: `Requested by: ${message.author.id}`,
                                icon_url: (_b = message.author.avatarURL({ dynamic: true })) !== null && _b !== void 0 ? _b : '',
                            },
                        },
                    ],
                });
            }
        });
    },
};
