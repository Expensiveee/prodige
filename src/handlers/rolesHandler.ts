import { ProdigeMessageCommand } from '../interfaces/MessageCommand';
import { sendError } from '../utils/send';

export const rolesHandler = (mCmd: ProdigeMessageCommand): boolean => {
  if (!mCmd.prodigeCommand) return false;
  if (mCmd.prodigeCommand.roles && !mCmd.haveRoles) {
    sendError({
      type: 'ROLE',
      command: mCmd,
      client: mCmd.client,
      message: mCmd.message,
    });
    return false;
  }
  return true;
};
