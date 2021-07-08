import { Message } from 'discord.js';
import { Prodige } from '..';
import { ProdigeArgument } from './Argument';
import { ProdigeMessageCommand } from './MessageCommand';
export interface ProdigeError {
    type: 'EXECUTION' | 'CHANNEL' | 'COOLDOWN' | 'PERMISSION' | 'ROLE' | 'ARGUMENT_REQUIRED' | 'ARGUMENT_WRONG_TYPE';
    message: Message;
    command: ProdigeMessageCommand;
    client: Prodige;
    argument?: ProdigeArgument;
    error?: unknown;
}
