import { ProdigeMessageCommand } from '../interfaces/MessageCommand';
import { send } from '../utils/send';
import ms from 'ms';
import { MessageEmbed } from 'discord.js';

export const cooldownHandler = (mCmd: ProdigeMessageCommand): boolean => {
  if (!mCmd.prodigeCommand) return true;
  if (mCmd.cooldown && !mCmd.cooldownBypass) {
    send(
      new MessageEmbed({
        title: `You will be able to execute this command in ${ms(
          mCmd.cooldown - Date.now(),
        )}`,
        color: mCmd.client.colors.RED,
      }),
      mCmd.message,
      mCmd.client,
      mCmd.prodigeCommand,
    );
    return false;
  }
  if (mCmd.prodigeCommand.cooldown && !mCmd.cooldownBypass) {
    mCmd.client.cooldowns.set(
      `${mCmd.message.author.id}_${mCmd.prodigeCommand?.name}`,
      Date.now() + mCmd.prodigeCommand.cooldown.delay,
    );
    setTimeout(() => {
      mCmd.client.cooldowns.delete(
        `${mCmd.message.author.id}_${mCmd.prodigeCommand?.name}`,
      );
    }, mCmd.prodigeCommand.cooldown.delay);
  }
  return true;
};
