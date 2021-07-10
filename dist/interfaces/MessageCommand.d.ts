import { Message } from 'discord.js';
import { Prodige } from '..';
import { ProdigeCommand } from './Command';
export interface ProdigeMessageCommand {
    message: Message;
    client: Prodige;
    prodigeCommand?: ProdigeCommand;
    commandName?: string;
    plainArgs?: Array<string>;
    cooldown?: number;
    cooldownBypass?: boolean;
    havePermissions?: boolean;
    haveRoles?: boolean;
    isAllowed?: boolean;
    allowedChannel?: boolean;
}
export interface ExtendedProdigeMessageCommand extends ProdigeMessageCommand {
    args: Record<string, unknown>;
}
