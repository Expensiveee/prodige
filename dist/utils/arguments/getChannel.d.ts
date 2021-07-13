import { GuildChannel, Message, ThreadChannel } from 'discord.js';
import { ProdigeChannelType } from '../../enums/ChannelsType';
export declare const getChannel: (message: Message, arg: string, type: Exclude<keyof typeof ProdigeChannelType, 'dm' | 'group' | 'unknown'>) => GuildChannel | ThreadChannel | undefined;
