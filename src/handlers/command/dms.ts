import { ProdigeMessageCommand } from '../../interfaces/MessageCommand';
import { sendError } from '../../utils/send';

export const dmsHandler = (mCmd: ProdigeMessageCommand): boolean => {
  if (!mCmd.prodigeCommand) return false;
  if (mCmd.prodigeCommand.dmOnly && !mCmd.inDmChannel) {
    sendError({
      type: 'NOT_IN_DM',
      command: mCmd,
      client: mCmd.client,
      message: mCmd.message,
    });
    return false;
  } else if (mCmd.prodigeCommand.dmOnly == false && mCmd.inDmChannel) {
    sendError({
      type: 'NOT_IN_GUILD',
      command: mCmd,
      client: mCmd.client,
      message: mCmd.message,
    });
    return false;
  }
  return true;
};
