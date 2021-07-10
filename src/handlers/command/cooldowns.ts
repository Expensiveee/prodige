import { ProdigeMessageCommand } from '../../interfaces/MessageCommand';
import { sendError } from '../../utils/send';

export const cooldownHandler = (mCmd: ProdigeMessageCommand): boolean => {
  if (!mCmd.prodigeCommand) return true;
  if (mCmd.cooldown && !mCmd.cooldownBypass) {
    sendError({
      type: 'COOLDOWN',
      command: mCmd,
      client: mCmd.client,
      message: mCmd.message,
    });
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
