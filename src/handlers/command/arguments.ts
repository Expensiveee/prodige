import { ProdigeArgument } from '../../interfaces/Argument';
import { ExtendedProdigeMessageCommand } from '../../interfaces/MessageCommand';
import { getMember } from '../../utils/arguments/getMember';
import { isNumber } from '../../utils/arguments/isNumber';
import { sendError } from '../../utils/send';
import { ProdigeChannelType } from '../../enums/ChannelsType';
import { getMessage } from '../../utils/arguments/getMessage';
import { getChannel } from '../../utils/arguments/getChannel';

export const argsHandler = (mCmdExtended: ExtendedProdigeMessageCommand): boolean => {
  const { prodigeCommand, plainArgs, message, args } = mCmdExtended;
  if (!prodigeCommand) return false;
  //Putting all the required arguments first then the optional ones at th end
  prodigeCommand.args?.sort((x, y) => {
    return x.required === y.required ? 0 : x.required ? -1 : 1;
  });
  if (!prodigeCommand.args || !plainArgs) return true;
  for (let i = 0; i < prodigeCommand?.args?.length; i++) {
    const { name, required, type, byDefault }: ProdigeArgument = prodigeCommand.args[i];
    const arg = plainArgs[i];
    if (required && !arg) {
      sendError({
        type: 'ARGUMENT_REQUIRED',
        command: mCmdExtended,
        argument: prodigeCommand.args[i],
        client: mCmdExtended.client,
        message: mCmdExtended.message,
      });
      return false;
    }
    if (!arg) {
      args[name] = byDefault;
      return true;
    }

    //Checking the argument type and validity

    //Note that the argument wil be checked even when the arg exists and is optional
    //For example, if an argument of type: member is expected but optional.
    //The checking will run if the user gives an argument and will send an error message if this type isn't respected.
    //If nothing is given by the user nothing will happen and will send the byDefault value or undefined
    if (type == 'string') {
      args[name] = arg;
      continue;
    } else if (type == 'number') {
      if (isNumber(arg)) {
        args[name] = parseFloat(arg);
        continue;
      }
    } else if (type == 'member') {
      const member = getMember(message, arg);
      if (member) {
        args[name] = member;
        continue;
      }
    } else if (type == 'message') {
      const msg = getMessage(message, arg);
      if (msg) {
        args[name] = msg;
        continue;
      }
    } else if (type in ProdigeChannelType) {
      const channel = getChannel(message, arg, type);
      if (channel) {
        args[name] = channel;
        continue;
      }
    }
    sendError({
      type: 'ARGUMENT_WRONG_TYPE',
      command: mCmdExtended,
      argument: prodigeCommand.args[i],
      client: mCmdExtended.client,
      message: mCmdExtended.message,
    });
    return false;
  }
  return true;
};
