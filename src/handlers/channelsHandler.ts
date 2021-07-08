import { ProdigeMessageCommand } from '../interfaces/MessageCommand';
import { sendError } from '../utils/send';

export const channelsHandler = (mCmd: ProdigeMessageCommand): boolean => {
  if (!mCmd.prodigeCommand) return false;
  if (mCmd.prodigeCommand.channels && !mCmd.allowedChannel) {
    sendError({
      type: 'CHANNEL',
      command: mCmd,
      client: mCmd.client,
      message: mCmd.message,
    });
    return false;
  }
  return true;
};
