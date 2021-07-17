import { Message } from 'discord.js';
import { Prodige } from '..';
import { ProdigeArgument } from './Argument';
import { ProdigeMessageCommand } from './MessageCommand';
export interface ProdigeError {
    type: 'EXECUTION' | 'CHANNEL' | 'COOLDOWN' | 'GLOBAL_COOLDOWN' | 'PERMISSION' | 'OWNER_ONLY' | 'ROLE' | 'ARGUMENT_REQUIRED' | 'ARGUMENT_WRONG_TYPE' | 'NOT_IN_DM' | 'NOT_IN_GUILD';
    message: Message;
    command: ProdigeMessageCommand;
    client: Prodige;
    argument?: ProdigeArgument;
    error?: unknown;
}
