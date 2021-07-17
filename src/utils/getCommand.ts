import { Prodige } from '..';
import { Message, PermissionResolvable } from 'discord.js';
import { ProdigeMessageCommand } from '../interfaces/MessageCommand';

export const getCommand = (
  client: Prodige,
  message: Message,
  prefix: string,
): ProdigeMessageCommand => {
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
    cooldown: client.cooldowns.get(`${message.author.id}_${prodigeCommand.name}`) ?? 0,
    //Mapping through the rolesBypass and checking for each one if the user has it.
    //Then checking if this array of booleans includes true
    cooldownBypass:
      prodigeCommand.cooldown?.rolesBypass
        ?.map((id: string) => message.member?.roles.cache.has(`${BigInt(id)}`))
        .includes(true) ?? false,
    globalCooldown:
      client.globalCooldowns.get(
        `${message.guild?.id ?? message.channel.id}_${prodigeCommand.name}`,
      ) ?? 0,
    haveRequiredPermissions:
      prodigeCommand.permissions
        ?.map((perm: PermissionResolvable) => message.member?.permissions.has(perm))
        .includes(true) ?? true,
    haveRequiredRoles:
      prodigeCommand.roles
        ?.map((roleId: string) => message.member?.roles.cache.has(`${BigInt(roleId)}`))
        .includes(true) ?? true,
    isOwner: client.config?.ownerId?.includes(message.author.id),
    inAllowedChannel:
      prodigeCommand.channels
        ?.map((id: string) => message.channel.id == `${BigInt(id)}`)
        .includes(true) ?? true,
    inDmChannel: message.channel.type == 'dm',
  };
};
