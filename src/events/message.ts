import { Message } from 'discord.js';
import { Prodige } from '..';
import { ProdigeEvent } from '../interfaces/Event';
import { getCommand } from '../utils/getCommand';
import { sendError } from '../utils/send';
import { argsHandler } from '../handlers/argsHandler';
import { permsHandler } from '../handlers/permsHandler';
import { rolesHandler } from '../handlers/rolesHandler';
import { channelsHandler } from '../handlers/channelsHandler';
import { cooldownHandler } from '../handlers/cooldownHandler';

export const event: ProdigeEvent = {
  name: 'messageCreate',
  run: async (client: Prodige, message: Message) => {
    //Defining an empty args object that will be
    const args: Record<string, unknown> = {};
    //Getting the ProdigeMessageCommand object for all the handlers below
    const command = getCommand(client, message);

    if (command.prodigeCommand?.deleteMessage) message.delete();

    if (!channelsHandler({ ...command })) return;
    if (!permsHandler({ ...command })) return;
    if (!rolesHandler({ ...command })) return;
    if (!cooldownHandler({ ...command })) return;

    // Note the the argsHandler needs ExtendedProdigeMessageCommand and not
    if (!argsHandler({ args, ...command })) return;

    //Adding error handling if something don't go very well
    try {
      command.prodigeCommand
        ?.run({ client, message, args, command: command.prodigeCommand })
        .catch(errorMessage => {
          sendError({ type: 'EXECUTION', data: command, errorMessage });
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (errorMessage: any) {
      sendError({ type: 'EXECUTION', data: command, errorMessage });
    }
  },
};
