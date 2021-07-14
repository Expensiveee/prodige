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
    if (client.config.allowBots == false && message.author.bot) return;
    //Defining an empty args object that will be
    const prefixes = client.getGuildPrefix(message.guild?.id ?? '');
    const args: Record<string, never> = {};

    for (let i = 0; i < prefixes.length; i++) {
      //Getting the ProdigeMessageCommand object for all the handlers below
      const command = getCommand(client, message, prefixes[i]);
      if (!command.prodigeCommand) continue;

      if (
        command.prodigeCommand?.deleteMessage &&
        !command.prodigeCommand.dmOnly &&
        !command.inDmChannel
      )
        message.delete();

      if (!dmsHandler({ ...command })) return;
      if (command.prodigeCommand?.dmOnly != true) {
        if (!channelsHandler({ ...command })) return;
        if (!permsHandler({ ...command })) return;
        if (!rolesHandler({ ...command })) return;
      }
      if (!cooldownHandler({ ...command })) return;

      // Note the the argsHandler needs ExtendedProdigeMessageCommand not ProdigeMessageCommand
      if (!argsHandler({ args, ...command })) return;

      //Adding error handling if something don't go very well
      try {
        command.prodigeCommand
          ?.run({ client, message, args, command: command.prodigeCommand, prefix: '!' })
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
      break;
    }
  },
};
