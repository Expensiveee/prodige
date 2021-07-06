import { MessageEmbed } from 'discord.js';
import { ProdigeMessageCommand } from '../interfaces/MessageCommand';
import { send } from '../utils/send';

export const permsHandler = (mCmd: ProdigeMessageCommand): boolean => {
  if (!mCmd.prodigeCommand) return false;
  if (mCmd.prodigeCommand.permissions && !mCmd.havePermissions) {
    send(
      new MessageEmbed({
        title: 'You don\'t have the required permissions to execute this command',
        color: mCmd.client.colors.RED,
      }),
      mCmd.message,
      mCmd.client,
      mCmd.prodigeCommand,
    );
    return false;
  }
  return true;
};
