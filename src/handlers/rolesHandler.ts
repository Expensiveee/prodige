import { ProdigeMessageCommand } from '../interfaces/MessageCommand';
import { sendError } from '../utils/send';

export const rolesHandler = (mCmd: ProdigeMessageCommand): boolean => {
  if (!mCmd.prodigeCommand) return false;
  if (mCmd.prodigeCommand.roles && !mCmd.haveRoles) {
    sendError({ type: 'ROLE', data: mCmd });
    return false;
  }
  return true;
};
