import { ProdigeMessageCommand } from '../interfaces/MessageCommand';
import { sendError } from '../utils/send';

export const permsHandler = (mCmd: ProdigeMessageCommand): boolean => {
  if (!mCmd.prodigeCommand) return false;
  if (mCmd.prodigeCommand.permissions && !mCmd.havePermissions) {
    sendError({ type: 'PERMISSION', data: mCmd });
    return false;
  }
  return true;
};
