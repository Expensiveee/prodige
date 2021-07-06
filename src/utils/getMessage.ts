import { Message } from 'discord.js';
export const getMessage = (
  message: Message | undefined,
  id: string,
): Message | undefined => {
  try {
    return message?.channel.messages.cache.get(`${BigInt(id)}`);
  } catch (err) {
    return;
  }
};
