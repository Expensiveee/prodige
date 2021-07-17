import { ProdigeMessageCommand } from '../../interfaces/MessageCommand';
import { sendError } from '../../utils/send';

export const globalCooldownHandler = (mCmd: ProdigeMessageCommand): boolean => {
  if (!mCmd.prodigeCommand) return true;
  if (mCmd.globalCooldown) {
    sendError({
      type: 'GLOBAL_COOLDOWN',
      command: mCmd,
      client: mCmd.client,
      message: mCmd.message,
    });
    return false;
  }
  if (mCmd.prodigeCommand.globalCooldown) {
    const id = mCmd.message.guild?.id ?? mCmd.message.channel.id;
    mCmd.client.globalCooldowns.set(
      `${id}_${mCmd.prodigeCommand?.name}`,
      Date.now() + mCmd.prodigeCommand.globalCooldown,
    );
    setTimeout(() => {
      mCmd.client.globalCooldowns.delete(`${id}_${mCmd.prodigeCommand?.name}`);
    }, mCmd.prodigeCommand.globalCooldown);
  }
  return true;
};
