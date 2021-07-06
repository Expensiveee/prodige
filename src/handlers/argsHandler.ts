import { ProdigeArgument } from '../interfaces/Argument';
import { ExtendedProdigeMessageCommand } from '../interfaces/MessageCommand';
import { getMember } from '../utils/getMember';
import { isNumber } from '../utils/isNumber';
import { send } from '../utils/send';
import { getChannel } from '../utils/getChannel';
import { MessageEmbed } from 'discord.js';
import { ProdigeCommand } from '../interfaces/Command';
import { ProdigeChannelType } from '../enums/ChannelsType';

export const argsHandler = ({
  prodigeCommand,
  plainArgs,
  commandName,
  message,
  client,
  args,
}: ExtendedProdigeMessageCommand): boolean => {
  if (!prodigeCommand) return false;
  prodigeCommand.args?.sort((x, y) => {
    return x.required === y.required ? 0 : x.required ? -1 : 1;
  });
  if (!prodigeCommand.args || !plainArgs) return true;
  for (let i = 0; i < prodigeCommand?.args?.length; i++) {
    const { name, required, type, byDefault }: ProdigeArgument = prodigeCommand.args[i];
    const arg = plainArgs[i];
    if (required && !arg) {
      const argsString = prodigeCommand.args
        .map((a: ProdigeArgument) => (a.required ? `[${a.name}]` : `(${a.name})`))
        .join(' ');
      send(
        new MessageEmbed({
          author: { name: 'Syntax: [] = required, () = optional.' },
          description: `**${name}** is required`,
          fields: [
            {
              name: 'Usage',
              value: `\`\`\`${client.config.prefix}${commandName} ${argsString} \`\`\``,
              inline: true,
            },
          ],
          color: client.colors.RED,
        }),
        message,
        client,
        prodigeCommand,
      );
      return false;
    }
    if (!arg) {
      args[name] = byDefault;
      return true;
    }
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
    } else if (type in ProdigeChannelType) {
      const channel = getChannel(message, arg, type);
      if (channel) {
        args[name] = channel;
        continue;
      }
    }
    send(
      new MessageEmbed({
        title: `\`\`\` ${name} \`\`\` must be a \`\`\` ${
          Object.values(ProdigeChannelType).includes(type) ? `${type}Channel` : type
        } \`\`\``,
      }),
      message,
      client,
      prodigeCommand,
    );
    return false;
  }
  return true;
};
