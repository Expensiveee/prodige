import { MessageEmbed } from 'discord.js';
import { ProdigeMessageCommand } from '../interfaces/MessageCommand';
import { send } from '../utils/send';

export const channelsHandler = (mCmd: ProdigeMessageCommand): boolean => {
  if (!mCmd.prodigeCommand) return false;
  if (mCmd.prodigeCommand.channels && !mCmd.allowedChannel) {
    send(
      new MessageEmbed({
        title: 'You can\'t execute commands here',
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
