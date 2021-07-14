import { Message } from 'discord.js';
import { Prodige } from '..';
import { ProdigeEvent } from '../interfaces/Event';
import { getCommand } from '../utils/getCommand';
import { sendError } from '../utils/send';
import { argsHandler } from '../handlers/command/arguments';
import { permsHandler } from '../handlers/command/permissions';
import { rolesHandler } from '../handlers/command/roles';
import { channelsHandler } from '../handlers/command/channels';
import { cooldownHandler } from '../handlers/command/cooldowns';
import { dmsHandler } from '../handlers/command/dms';

export const messageEvent: ProdigeEvent = {
  name: 'messageCreate',
  run: async (client: Prodige, message: Message) => {
    //Defining an empty args object that will be
    const prefix = client.getGuildPrefix(message.guild?.id ?? '');
    const args: Record<string, never> = {};
    //Getting the ProdigeMessageCommand object for all the handlers below
    const command = getCommand(client, message);

    if (
      command.prodigeCommand?.deleteMessage &&
      !command.prodigeCommand.dmOnly &&
      !command.inDmChannel
    )
      message.delete();

    if (!dmsHandler({ ...command })) return;
    if (command.prodigeCommand?.dmOnly != true) {
      console.log('Ran1');
      if (!channelsHandler({ ...command })) return;
      console.log('Ran2');
      if (!permsHandler({ ...command })) return;
      console.log('Ran3');
      if (!rolesHandler({ ...command })) return;
      console.log('Ran');
    }
    if (!cooldownHandler({ ...command })) return;

    // Note the the argsHandler needs ExtendedProdigeMessageCommand not ProdigeMessageCommand
    if (!argsHandler({ args, ...command })) return;

    //Adding error handling if something don't go very well
    try {
      command.prodigeCommand
        ?.run({ client, message, args, command: command.prodigeCommand, prefix })
        .catch(error => {
          sendError({
            type: 'EXECUTION',
            command,
            error,
            message: command.message,
            client: client,
          });
        });
    } catch (error: unknown) {
      sendError({
        type: 'EXECUTION',
        command,
        error,
        message: command.message,
        client: client,
      });
    }
  },
};
