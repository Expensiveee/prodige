import { ProdigeMessageCommand } from '../../interfaces/MessageCommand';
import { sendError } from '../../utils/send';

export const botPermsHandler = (mCmd: ProdigeMessageCommand): boolean => {
  if (!mCmd.prodigeCommand) return false;
  if (mCmd.prodigeCommand.botPermissions && !mCmd.haveRequiredBotPermissions) {
    sendError({
      type: 'BOT_PERMISSION',
      command: mCmd,
      client: mCmd.client,
      message: mCmd.message,
    });
    return false;
  }
  return true;
};
