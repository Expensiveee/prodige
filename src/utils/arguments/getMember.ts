import { GuildMember, Message } from 'discord.js';

export const getMember = (message: Message, arg: string): GuildMember | undefined => {
  const id = arg.replace('<', '').replace('>', '').replace('!', '').replace('@', '');
  try {
    return message.guild?.members.cache.get(`${BigInt(id)}`);
  } catch (err) {
    return;
  }
};
