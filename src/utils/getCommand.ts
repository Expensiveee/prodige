import { Prodige } from '..';
import { Message, PermissionResolvable } from 'discord.js';
import { ProdigeMessageCommand } from '../interfaces/MessageCommand';

export const getCommand = (client: Prodige, message: Message): ProdigeMessageCommand => {
  if (!message.content.startsWith(client.config.prefix) || message.author.bot)
    return { client, message };
  const plainArgs: string[] = message.content
    .slice(client.config.prefix.length)
    .split(/ +/);
  const commandName = plainArgs?.shift()?.toLowerCase() ?? '';
  const prodigeCommand =
    client.commands.get(commandName) ??
    client.commands.get(client.aliases.get(commandName) ?? '');
  if (!prodigeCommand) return { client, message };
  if (prodigeCommand.ownerOnly && message.author.id != `${client.config.ownerId}`)
    return { client, message };
  return {
    client,
    message,
    prodigeCommand,
    commandName,
    plainArgs,
    cooldown: client.cooldowns.get(`${message.author.id}_${prodigeCommand.name}`),
    cooldownBypass:
      prodigeCommand.cooldown?.roleBypass
        ?.map((id: string) => message.member?.roles.cache.has(`${BigInt(id)}`))
        .includes(true) || false,
    havePermissions: prodigeCommand.permissions
      ?.map((perm: PermissionResolvable) => message.member?.permissions.has(perm))
      .includes(true),
    haveRoles: prodigeCommand.roles
      ?.map((roleId: string) => message.member?.roles.cache.has(`${BigInt(roleId)}`))
      .includes(true),
    allowedChannel: prodigeCommand.channels
      ?.map((id: string) => message.channel.id == `${BigInt(id)}`)
      .includes(true),
  };
};
