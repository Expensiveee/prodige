import { ProdigeMessageCommand } from '../../interfaces/MessageCommand';
import { sendError } from '../../utils/send';

export const permsHandler = (mCmd: ProdigeMessageCommand): boolean => {
  if (!mCmd.prodigeCommand) return false;
  if (mCmd.prodigeCommand.ownerOnly && !mCmd.isOwner) {
    sendError({
      type: 'OWNER_ONLY',
      command: mCmd,
      client: mCmd.client,
      message: mCmd.message,
    });
    return false;
  } else if (mCmd.prodigeCommand.permissions && !mCmd.haveRequiredPermissions) {
    sendError({
      type: 'PERMISSION',
      command: mCmd,
      client: mCmd.client,
      message: mCmd.message,
    });
    return false;
  }
  return true;
};
