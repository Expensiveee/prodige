import { Message, PermissionResolvable } from 'discord.js';
import { Prodige } from '..';
import { ProdigeArgument } from './Argument';
import { ProdigeCooldown } from './Cooldown';
interface ProdigeRunFunction {
    ({ client, message, args, command, prefix, }: {
        client: Prodige;
        message: Message;
        args: Record<string, never>;
        command: ProdigeCommand;
        prefix: string;
    }): Promise<unknown>;
}
export interface ProdigeCommand {
    name: string;
    run: ProdigeRunFunction;
    description?: string;
    category?: string;
    usage?: string;
    args?: Array<ProdigeArgument>;
    aliases?: Array<string>;
    cooldown?: ProdigeCooldown;
    dmOnly?: boolean;
    ownerOnly?: boolean;
    channels?: Array<string>;
    roles?: Array<string>;
    permissions?: Array<PermissionResolvable>;
    deleteMessage?: boolean;
}
export interface ProdigeCommandCategory {
    name: string;
    aliases?: Array<string>;
    description: string;
    usage?: string;
}
export {};
