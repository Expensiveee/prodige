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
    globalCooldown?: number;
    cooldownBypass?: boolean;
    haveRequiredPermissions?: boolean;
    haveRequiredBotPermissions?: boolean;
    haveRequiredRoles?: boolean;
    isOwner?: boolean;
    inAllowedChannel?: boolean;
    inDmChannel?: boolean;
}
export interface ExtendedProdigeMessageCommand extends ProdigeMessageCommand {
    args: Record<string, unknown>;
}
