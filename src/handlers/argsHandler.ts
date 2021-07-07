import { ProdigeArgument } from '../interfaces/Argument';
import { ExtendedProdigeMessageCommand } from '../interfaces/MessageCommand';
import { getMember } from '../utils/getMember';
import { isNumber } from '../utils/isNumber';
import { send } from '../utils/send';
import { getChannel } from '../utils/getChannel';
import { MessageEmbed } from 'discord.js';
import { ProdigeChannelType } from '../enums/ChannelsType';
import { getMessage } from '../utils/getMessage';

export const argsHandler = ({
  prodigeCommand,
  plainArgs,
  commandName,
  message,
  client,
  args,
}: ExtendedProdigeMessageCommand): boolean => {
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
