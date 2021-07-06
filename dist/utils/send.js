"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
const send = async (embed, message, client, command) => {
    if (!client.config.sendErrorMessages)
        return;
    embed.footer = {
        text: message.author.tag,
        iconURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp`,
    };
    embed.color = client.colors.RED;
    if (command === null || command === void 0 ? void 0 : command.deleteMessage) {
        return message.channel
            .send({
            embeds: [embed],
        })
            .then((msg) => {
            if (client.config.delErrorMessage != -1) {
                setTimeout(() => msg.delete(), client.config.delErrorMessage);
            }
        });
    }
    else {
        return message.channel
            .send({
            embeds: [embed],
        })
            .then((msg) => {
            if (client.config.delErrorMessage != -1) {
                setTimeout(() => msg.delete(), client.config.delErrorMessage);
            }
        });
    }
};
exports.send = send;
