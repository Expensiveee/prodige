import { GuildChannel, Message, ThreadChannel } from 'discord.js';
import { ProdigeChannelType } from '../enums/ChannelsType';
export const getChannel = (
  message: Message,
  arg: string,
  type: Exclude<keyof typeof ProdigeChannelType, 'dm' | 'group' | 'unknown'>,
): GuildChannel | ThreadChannel | undefined => {
  const id = arg.replace('<', '').replace('>', '').replace('#', '');
  return message.guild?.channels.cache.find(
    channel => channel.id === id && channel.type == type,
  );
};
