import { Prodige } from '..';
import { ProdigeCommand } from '../interfaces/Command';
import { Message, MessageEmbed } from 'discord.js';

export const send = async (
  embed: MessageEmbed,
  message: Message,
  client: Prodige,
  command?: ProdigeCommand,
): Promise<unknown> => {
  if (!client.config.sendErrorMessages) return;
  embed.footer = {
    text: message.author.tag,
    iconURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp`,
  };
  embed.color = client.colors.RED;
  if (command?.deleteMessage) {
    return message.channel
      .send({
        embeds: [embed],
      })
      .then((msg: Message) => {
        if (client.config.delErrorMessage != -1) {
          setTimeout(() => msg.delete(), client.config.delErrorMessage);
        }
      });
  } else {
    return message.channel
      .send({
        embeds: [embed],
      })
      .then((msg: Message) => {
        if (client.config.delErrorMessage != -1) {
          setTimeout(() => msg.delete(), client.config.delErrorMessage);
        }
      });
  }
};
