import { Prodige } from '..';
import { Message, PermissionResolvable } from 'discord.js';
import { ProdigeMessageCommand } from '../interfaces/MessageCommand';

export const getCommand = (client: Prodige, message: Message): ProdigeMessageCommand => {
  const prefix = client.getGuildPrefix(`${message?.guild?.id}`);
  if (!message.content.startsWith(prefix) || message.author.bot)
    return { client, message };

  const plainArgs: string[] = message.content.slice(prefix.length).split(/ +/);
  const commandName = plainArgs?.shift()?.toLowerCase();
  if (!commandName) return { client, message };

  const prodigeCommand =
    client.commands.get(commandName) ??
    client.commands.get(client.aliases.get(commandName) ?? '');

  if (!prodigeCommand) return { client, message };

  return {
    client,
    message,
    prodigeCommand,
    commandName,
    plainArgs,
    cooldown: client.cooldowns.get(`${message.author.id}_${prodigeCommand.name}`),
    //Mapping through the rolesBypass and checking for each one if the user has it.
    //Then checking if this array of booleans includes true
    cooldownBypass:
      prodigeCommand.cooldown?.roleBypass
        ?.map((id: string) => message.member?.roles.cache.has(`${BigInt(id)}`))
        .includes(true) || false,
    haveRequiredPermissions: prodigeCommand.permissions
      ?.map((perm: PermissionResolvable) => message.member?.permissions.has(perm))
      .includes(true),
    haveRequiredRoles: prodigeCommand.roles
      ?.map((roleId: string) => message.member?.roles.cache.has(`${BigInt(roleId)}`))
      .includes(true),
    isOwner: client.config?.ownerId?.includes(message.author.id),
    inAllowedChannel: prodigeCommand.channels
      ?.map((id: string) => message.channel.id == `${BigInt(id)}`)
      .includes(true),
    inDmChannel: message.channel.type == 'dm',
  };
};
