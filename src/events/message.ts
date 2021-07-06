import { Message, MessageEmbed } from 'discord.js';
import { Prodige } from '..';
import { ProdigeEvent } from '../interfaces/Event';
import { getCommand } from '../utils/getCommand';
import { send } from '../utils/send';
import { argsHandler } from '../handlers/argsHandler';
import { permsHandler } from '../handlers/permsHandler';
import { rolesHandler } from '../handlers/rolesHandler';
import { channelsHandler } from '../handlers/channelsHandler';
import { cooldownHandler } from '../handlers/cooldownHandler';

export const event: ProdigeEvent = {
  name: 'message',
  run: async (client: Prodige, message: Message) => {
    const args: Record<string, unknown> = {};
    const command = getCommand(client, message);
    if (command.prodigeCommand?.deleteMessage) message.delete();
    if (!channelsHandler({ ...command })) return;
    if (!permsHandler({ ...command })) return;
    if (!rolesHandler({ ...command })) return;
    if (!cooldownHandler({ ...command })) return;
    if (!argsHandler({ args, ...command })) return;
    try {
      command.prodigeCommand
        ?.run({ client, message, args, command: command.prodigeCommand })
        .catch(err => {
          return send(
            new MessageEmbed({
              author: { name: 'Error' },
              title: '```' + err.message + '```',
              description: '```' + err.stack + '```',
              color: client.colors.RED,
            }),
            message,
            client,
            command.prodigeCommand,
          );
        });
    } catch (err) {
      send(
        new MessageEmbed({
          author: { name: 'Error' },
          title: '```' + err.message + '```',
          description: '```' + err.stack + '```',
          color: client.colors.RED,
        }),
        message,
        client,
        command.prodigeCommand,
      );
    }
  },
};
